import React, { Component } from "react";

import { withCartContext, CartContext } from "./CartContext";
import { FlatList, View } from "react-native";
import { Icon, ListItem, Text } from "react-native-elements";

class CartOverviewList extends Component<IProps> {
  render() {
    const {
      cart,
      grandTotal,
      table,
      paymentMethod,
      removeCartItem
    } = this.props.cartContext;
    const { viewOnly = false, order } = this.props;

    return (
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
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text>{item.item.price.toFixed(2)}€</Text>
                  <Icon name="close" onPress={() => removeCartItem(item)} />
                </View>
              )
            }
          />
        ))}

        <ListItem
          title={<Text style={{ fontWeight: "bold" }}>Summe (inkl. Mwst)</Text>}
          rightElement={
            <Text style={{ fontWeight: "bold" }}>{grandTotal.toFixed(2)}€</Text>
          }
        />
      </React.Fragment>
    );
  }
}

export default withCartContext(CartOverviewList);

interface IProps {
  cartContext: CartContext;
  viewOnly?: boolean;
  order?: any;
}
