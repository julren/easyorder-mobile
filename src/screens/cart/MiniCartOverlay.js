import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Icon, Right, Left, Container } from "native-base";
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";
import { CartConsumer, withCartContext } from "./CartContext";
import { ThemeConsumer } from "react-native-elements";

class MiniCartOverlay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { cart, onPress } = this.props;
    const { calcGrandTotal, calcNumCartItems } = this.props.cartContext;

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(0, 0, 0, 0)",
              height: 80,
              padding: 8,
              marginBottom: 16
            }}
            onPress={onPress}
          >
            <View
              style={{
                alignItems: "center",
                backgroundColor: theme.colors.primary,
                flexDirection: "row",
                flex: 1,
                padding: 8,
                borderRadius: 16,

                backgroundColor: theme.colors.primary
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
      </ThemeConsumer>
    );
  }
}

export default withCartContext(MiniCartOverlay);

MiniCartOverlay.propTypes = {
  cart: PropTypes.array.isRequired
};
