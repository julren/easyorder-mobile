import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Icon, Right, Left, Container } from "native-base";
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";
import { CartConsumer } from "./CartContext";

class MiniCartOverlay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { cart, onPress } = this.props;

    return (
      <CartConsumer>
        {({ calcGrandTotal, calcNumCartItems }) => (
          <TouchableOpacity
            style={{
              backgroundColor: "#2185d0",
              height: 50,
              padding: 10
            }}
            onPress={onPress}
          >
            <View
              style={{
                alignItems: "center",
                backgroundColor: "#2185d0",
                flexDirection: "row",
                flex: 1
              }}
            >
              <View style={{ marginRight: 10 }}>
                <Icon
                  ios="ios-cart"
                  android="md-cart"
                  style={{ fontSize: 30, color: "white" }}
                />
              </View>

              <View style={{ flexGrow: 1 }}>
                <Text style={{ color: "white" }}>
                  {calcNumCartItems()} Artikel
                </Text>
                <Text style={{ color: "white" }}>
                  Gesammtsumme: {parseFloat(calcGrandTotal()).toFixed(2)}€
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </CartConsumer>
    );
  }
}

export default MiniCartOverlay;

MiniCartOverlay.propTypes = {
  cart: PropTypes.array.isRequired
};
