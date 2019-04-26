import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";

import {
  withCartContext,
  CartContext,
  CartConsumer
} from "../../contexts/CartContext";
import { ThemeConsumer, Text, Icon } from "react-native-elements";

interface IProps {
  onPress: () => void;
}

interface IState {}

class MiniCartOverlay extends Component<IProps, IState> {
  render() {
    const { onPress } = this.props;

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <CartConsumer>
            {({ grandTotal, numCartItems }) => (
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
                    padding: 16
                  }}
                >
                  <View style={{ marginRight: 10 }}>
                    <Icon
                      name="shopping-cart"
                      iconStyle={{ fontSize: 30, color: "white" }}
                    />
                  </View>

                  <View style={{ flexGrow: 1 }}>
                    <Text style={{ color: "white" }}>
                      {numCartItems} Artikel
                    </Text>
                    <Text style={{ color: "white" }}>
                      Gesammtsumme: {grandTotal.toFixed(2)}€
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </CartConsumer>
        )}
      </ThemeConsumer>
    );
  }
}

export default MiniCartOverlay;
