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

class CartScreen extends Component {
  static navigationOptions = {
    title: "Warenkorb"
  };

  constructor(props) {
    super(props);
    this.state = {
      paymentModalVisible: false
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
    const {
      cart,
      table,
      paymentMethod,
      substractCart,
      calcNumCartItems,
      calcGrandTotal,
      removeCartItem,
      calcMwst
    } = this.props.cartContext;
    return (
      <Container>
        <Content padded>
          {cart.length > 0 ? (
            <React.Fragment>
              <List>
                <Separator bordered>
                  <Text>Deine Bestellung</Text>
                </Separator>
                {cart.map((element, index) => (
                  <ListItem thumbnail key={index}>
                    <Left>
                      <Thumbnail square source={{ uri: element.item.photo }} />
                    </Left>
                    <Body>
                      <Text>
                        {element.quantity}x {element.item.name}
                      </Text>
                      <Text note numberOfLines={1}>
                        {element.item.description}
                      </Text>
                    </Body>
                    <Right
                      style={{
                        flexDirection: "row",
                        alignItems: "center"
                      }}
                    >
                      <Text>
                        {parseFloat(
                          element.quantity * element.item.price
                        ).toFixed(2)}
                        €
                      </Text>
                      <Button
                        icon
                        bordered
                        danger
                        style={{
                          marginLeft: 5,
                          paddingTop: 0,
                          paddingBottom: 0
                        }}
                        onPress={() => removeCartItem(element)}
                      >
                        <Icon
                          name="trash"
                          style={{
                            marginLeft: 7,
                            marginRight: 7,
                            marginTop: 0,
                            marginBottom: 0
                          }}
                        />
                      </Button>
                    </Right>
                  </ListItem>
                ))}

                <ListItem>
                  <Left>
                    <Text>Inkl. Mwst</Text>
                  </Left>
                  <Right>
                    <Text>{calcMwst()}€</Text>
                  </Right>
                </ListItem>
                <ListItem>
                  <Left>
                    <Text style={{ fontWeight: "bold" }}>Summe</Text>
                  </Left>
                  <Right>
                    <Text style={{ fontWeight: "bold" }}>
                      {calcGrandTotal()}€
                    </Text>
                  </Right>
                </ListItem>

                <Separator bordered>
                  <Text>Bezahlmethode</Text>
                </Separator>

                <ListItem onPress={() => this.openPaymentModal()}>
                  <Body>
                    {paymentMethod ? (
                      <Text>Bezahlmethode</Text>
                    ) : (
                      <Text>Bezahlmethode auswählen...</Text>
                    )}
                  </Body>
                  <Right>
                    <Icon
                      type="FontAwesome"
                      name={this.getIconNameForPaymentMethod(paymentMethod)}
                    />
                  </Right>
                </ListItem>
                <Separator bordered />
              </List>

              <Content padder>
                <Button
                  style={{ marginTop: 10 }}
                  disabled={paymentMethod ? false : true}
                  block
                  onPress={() => this.placeOrderAndNavigate()}
                >
                  <Text style={{ marginLeft: 0 }}> Jetzt kaufen</Text>
                </Button>
              </Content>
            </React.Fragment>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center"
              }}
            >
              <Text>Warenkorb ist leer</Text>
            </View>
          )}

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
