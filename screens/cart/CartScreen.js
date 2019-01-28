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
import { CartProvider, CartConsumer } from "./CartContext";
import CartItemsList from "./CartItemsList";

export default class CartScreen extends React.Component {
  static navigationOptions = {
    title: "Warenkorb"
  };

  constructor(props) {
    super(props);
  }

  render() {
    // let { cart } = this.props.navigation.getParam("cart", []);
    return (
      <ScrollView padded>
        <Container>
          <Content>
            <Text>Warenkorb</Text>
            <CartItemsList />
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
