import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text } from "native-base";
import { CartConsumer } from "./CartContext";
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";

class MiniCartOverlay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { cart } = this.props;

    let grandTotal = 0;
    cart.forEach(element => {
      grandTotal += element.price;
    });

    return (
      <TouchableOpacity
        style={{
          justifyContent: "center",
          backgroundColor: "#2185d0",
          height: 50,
          padding: 10
        }}
        onPress={() => {
          this.props.navigation.navigate("Cart");
        }}
      >
        <Text style={{ color: "white" }}>Cart {cart.length}</Text>
        <Text style={{ color: "white" }}>{grandTotal}€</Text>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(MiniCartOverlay);

MiniCartOverlay.propTypes = {
  cart: PropTypes.array.isRequired
};
