import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  Text,
  Container,
  Form,
  Item,
  Input,
  Header,
  Button,
  Content
} from "native-base";
import CartOverview from "./CartOverview";
import { CartConsumer } from "./CartContext";

export default class CartScreen extends React.Component {
  static navigationOptions = {
    title: "Warenkorb"
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView padded>
        <Container>
          <Content>
            <CartConsumer>
              {({
                cart,
                addCartItem,
                removeCartItem,
                updateCartItemQuantity
              }) => (
                <React.Fragment>
                  <CartOverview
                    onCheckout={() => {
                      this.props.navigation.navigate("Checkout");
                    }}
                  />
                </React.Fragment>
              )}
            </CartConsumer>
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
