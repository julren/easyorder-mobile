import React, { Component } from "react";
import { Modal, ScrollView, View, StyleSheet } from "react-native";

import {
  CartConsumer,
  withCartContext,
  CartContextProps
} from "../../contexts/CartContext";
import SelectPaymentModal from "./SelectPaymentModal";
import BarcodeScanner from "../../components/BarcodeScanner";
import ScanTableCodeButton from "./ScanTableCodeButton";
import CartOverviewList from "./CartOverviewList";
import Separator from "../../components/Separator";
import { NavigationScreenProp, NavigationScreenProps } from "react-navigation";
import { Text, ListItem, Button } from "react-native-elements";
import { firebaseOrders, firebaseTables } from "../../config/firebase";

interface IProps extends NavigationScreenProps<any, any>, CartContextProps {}

interface IState {
  paymentModalVisible: boolean;
  barcodeScannerActive: boolean;
}

class CartScreen extends Component<IProps, IState> {
  static navigationOptions = {
    title: "Warenkorb"
  };

  constructor(props) {
    super(props);
    this.state = {
      paymentModalVisible: false,
      barcodeScannerActive: false
    };
  }

  closePaymentModal = () => {
    this.setState({
      paymentModalVisible: false
    });
  };

  openPaymentModal = () => {
    this.setState({
      paymentModalVisible: true
    });
  };

  getIconNameForPaymentMethod = paymentMethod => {
    switch (paymentMethod) {
      case "paypal":
        return "paypal";
      case "cash":
        return "money";
      case "creditcard":
        return "credit-card";
      default:
        return "question-circle-o";
    }
  };

  placeOrderAndNavigate = () => {
    this.props.cartContext
      .placeOrder()
      .then(orderID => {
        this.props.navigation.replace("OrderOverview", {
          orderID: orderID
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { cart, table, paymentMethod } = this.props.cartContext;

    // If cart is empty
    if (cart.length <= 0)
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 75 }}>👻</Text>
          <Text h2>Dein Warenkorb ist leer.</Text>
        </View>
      );

    // If cart is filled
    return (
      <ScrollView>
        <Separator heading="Deine Bestellung" />

        <CartOverviewList />

        <Separator border={false} />

        {!table ? (
          <ScanTableCodeButton
            onPress={() => this.props.navigation.navigate("QrCodeScanner")}
          />
        ) : (
          <React.Fragment>
            <Separator heading="Tischnummer" />

            <ListItem
              title="Tischnummer:"
              rightElement={<Text>{table.name}</Text>}
              onPress={() => this.props.navigation.navigate("QrCodeScanner")}
            />

            <Separator heading="Bezahlmethode" />

            {paymentMethod ? (
              <ListItem
                title="Bezahlmethode"
                rightIcon={{
                  name: this.getIconNameForPaymentMethod(paymentMethod),
                  type: "font-awesome"
                }}
                onPress={() => this.openPaymentModal()}
              />
            ) : (
              <ListItem
                title="Bitte Bezahlmethode auswählen..."
                onPress={() => this.openPaymentModal()}
              />
            )}
            <Separator border={false} />

            <Button
              title="Jetzt kaufen"
              containerStyle={{ marginTop: 10, marginHorizontal: 16 }}
              disabled={paymentMethod ? false : true}
              onPress={() => this.placeOrderAndNavigate()}
            />
          </React.Fragment>
        )}

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.paymentModalVisible}
        >
          <SelectPaymentModal onClose={this.closePaymentModal} />
        </Modal>
      </ScrollView>
    );
  }
}

export default withCartContext(CartScreen);
