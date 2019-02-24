import React, { Component } from "react";
import { Modal, ScrollView, StyleSheet } from "react-native";

import {
  Container,
  Text,
  List,
  ListItem,
  Body,
  Right,
  Left,
  Thumbnail,
  Button,
  Icon,
  TouchableOpacity,
  Separator,
  View,
  Content,
  H2
} from "native-base";
import { CartConsumer, withCartContext } from "./CartContext";
import SelectPaymentModal from "./SelectPaymentModal";
import BarcodeScanner from "../../components/BarcodeScanner";
import ScanTableCodeButton from "./ScanTableCodeButton";
import CartOverviewList from "./CartOverviewList";

class CartScreen extends Component {
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
        break;
      case "cash":
        return "money";
        break;
      default:
        return "question-circle-o";
    }
  };

  placeOrderAndNavigate = () => {
    this.props.cartContext
      .placeOrder()
      .then(orderID => {
        this.props.navigation.navigate("OrderOverview", {
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
        <Container>
          <Text>Warenkorb ist leer</Text>
        </Container>
      );

    // If cart is filled
    return (
      <Container>
        <Content>
          <List>
            <Separator>
              <Text>Deine Bestellung</Text>
            </Separator>

            <CartOverviewList />

            <Separator />

            {!table ? (
              <ScanTableCodeButton
                onPress={() => this.props.navigation.navigate("QrCodeScanner")}
              />
            ) : (
              <React.Fragment>
                <Separator bordered>
                  <Text>Tischnummer</Text>
                </Separator>

                <ListItem
                  button
                  noIndent
                  onPress={() =>
                    this.props.navigation.navigate("QrCodeScanner")
                  }
                >
                  <Body>
                    <Text>Tischnummer:</Text>
                  </Body>
                  <Right>
                    <Text>{table}</Text>
                  </Right>
                </ListItem>

                <Separator bordered>
                  <Text>Bezahlmethode</Text>
                </Separator>

                <ListItem noIndent onPress={() => this.openPaymentModal()}>
                  <Body>
                    {paymentMethod ? (
                      <Text>Bezahlmethode</Text>
                    ) : (
                      <Text>Bitte Bezahlmethode auswählen...</Text>
                    )}
                  </Body>
                  <Right>
                    <Icon
                      type="FontAwesome"
                      name={this.getIconNameForPaymentMethod(paymentMethod)}
                    />
                  </Right>
                </ListItem>
                <Separator />

                <Button
                  style={{ marginTop: 10, marginHorizontal: 16 }}
                  disabled={paymentMethod ? false : true}
                  block
                  onPress={() => this.placeOrderAndNavigate()}
                >
                  <Text> Jetzt kaufen</Text>
                </Button>
              </React.Fragment>
            )}
          </List>

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.paymentModalVisible}
          >
            <SelectPaymentModal onClose={this.closePaymentModal} />
          </Modal>
        </Content>
      </Container>
    );
  }
}

export default withCartContext(CartScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
