import React, { Component } from "react";
import { Modal, ScrollView, View, StyleSheet } from "react-native";

import { GlobalContext } from "../../contexts/GlobalContext";
import SelectPaymentModal from "./selectPaymentModal/SelectPaymentModal";
import BarcodeScanner from "../../components/BarcodeScanner";
import CartItemsSummaryList from "./CartItemsSummaryList";
import Separator from "../../components/basic/Separator";
import {
  NavigationScreenProp,
  NavigationScreenProps,
  NavigationActions,
  NavigationState,
  NavigationProp
} from "react-navigation";
import { Text, ListItem, Button, Image, Icon } from "react-native-elements";
import { firebaseOrders, firebaseTables } from "../../config/firebase";
import withGlobalContext from "../../contexts/withGlobalContext";
import BuyNowOverlay from "./BuyNowOverlay";
import { Constants } from "expo";
import Row from "../../components/basic/Row";

interface IProps extends NavigationScreenProps {
  globalContext: GlobalContext;
}

interface IState {
  paymentModalVisible: boolean;
}

class CheckoutScreen extends Component<IProps, IState> {
  static navigationOptions = {};

  constructor(props) {
    super(props);
    this.state = {
      paymentModalVisible: false
    };
  }

  closePaymentModal = paymentMethod => {
    this.props.globalContext.setPaymentMethod(paymentMethod);
    this.setState({
      paymentModalVisible: false
    });
  };

  openPaymentModal = () => {
    this.setState({
      paymentModalVisible: true
    });
  };

  getIconNameForPaymentMethod = paymentMethodName => {
    switch (paymentMethodName) {
      case "paypal":
        return "cc-paypal";
      case "cash":
        return "money";
      case "creditcard":
        return "credit-card";
      default:
        return "question-circle-o";
    }
  };

  placeOrderAndNavigate = () => {
    this.props.globalContext
      .placeOrder()
      .then(order => {
        this.props.navigation.navigate("OrderConfirmation", { order: order });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const {
      cart,
      table = { name: "test" },
      paymentMethod,
      selectedRestaurant = { name: "Testaurant" }
    } = this.props.globalContext;

    // If cart is empty
    // if (cart.length <= 0)
    //   return (
    //     <View
    //       style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    //     >
    //       <Text style={{ fontSize: 75 }}>👻</Text>
    //       <Text h2>Dein Warenkorb ist leer.</Text>
    //     </View>
    //   );

    // If cart is filled

    return (
      <React.Fragment>
        <ScrollView>
          <ListItem
            title={
              <View>
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: "bold"
                  }}
                >
                  Bestellung abschließen
                </Text>

                <Row>
                  <Icon
                    name="restaurant-menu"
                    containerStyle={{ marginRight: 8 }}
                    iconStyle={{ color: "grey", fontSize: 14 }}
                  />
                  <Text style={{ color: "grey" }}>
                    {selectedRestaurant.name}
                  </Text>
                </Row>
                <Row>
                  <Icon
                    type="material-community"
                    name="alpha-t-box"
                    containerStyle={{ marginRight: 8 }}
                    iconStyle={{ color: "grey", fontSize: 14 }}
                  />
                  <Text style={{ color: "grey" }}>{table.name}</Text>
                </Row>
              </View>
            }
          />

          <Separator heading="Artikel" />

          <CartItemsSummaryList />

          <React.Fragment>
            <Separator heading="Zahlungsweise" borderBottom />

            {paymentMethod.name ? (
              <ListItem
                title="Zahlungsweise"
                rightIcon={{
                  name: this.getIconNameForPaymentMethod(paymentMethod.name),
                  type: "font-awesome"
                }}
                onPress={() => this.openPaymentModal()}
              />
            ) : (
              <ListItem
                title="Bitte Zahlungsweise auswählen..."
                onPress={() => this.openPaymentModal()}
              />
            )}
            <Separator />
          </React.Fragment>

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.paymentModalVisible}
          >
            <SelectPaymentModal onClose={this.closePaymentModal} />
          </Modal>
        </ScrollView>

        <BuyNowOverlay onPress={this.placeOrderAndNavigate} />
      </React.Fragment>
    );
  }
}

export default withGlobalContext(CheckoutScreen);
