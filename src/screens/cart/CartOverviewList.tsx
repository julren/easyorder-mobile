import React, { Component } from "react";

import {
  withCartContext,
  CartContext,
  CartConsumer
} from "../../contexts/CartContext";

import { FlatList, View } from "react-native";
import { Icon, ListItem, Text } from "react-native-elements";

interface IProps {
  viewOnly?: boolean;
  order?: any;
}

class CartOverviewList extends Component<IProps> {
  render() {
    const { viewOnly = false } = this.props;

    return (
      <CartConsumer>
        {({ cart, grandTotal, removeCartItem }) => (
          <React.Fragment>
            {cart.map((item, index) => (
              <ListItem
                key={item.item.id}
                bottomDivider
                title={`${item.quantity}x ${item.item.name}`}
                subtitle={item.item.description ? item.item.description : null}
                leftAvatar={{
                  rounded: false,
                  source: {
                    uri: item.item.photo
                  },
                  size: "medium"
                }}
                rightElement={
                  viewOnly ? null : (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text>{item.item.price.toFixed(2)}€</Text>
                      <Icon name="close" onPress={() => removeCartItem(item)} />
                    </View>
                  )
                }
              />
            ))}

            <ListItem
              title={
                <Text style={{ fontWeight: "bold" }}>Summe (inkl. Mwst)</Text>
              }
              rightElement={
                <Text style={{ fontWeight: "bold" }}>
                  {grandTotal.toFixed(2)}€
                </Text>
              }
            />
          </React.Fragment>
        )}
      </CartConsumer>
    );
  }
}

export default CartOverviewList;
