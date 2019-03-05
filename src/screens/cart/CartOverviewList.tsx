import React, { Component } from "react";

import { withCartContext } from "./CartContext";
import { FlatList, View } from "react-native";
import { Icon, ListItem, Text } from "react-native-elements";

class CartOverviewList extends Component<IProps> {
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
    const { viewOnly = false } = this.props;

    return (
      <React.Fragment>
        {cart.map((item, index) => (
          <ListItem
            key={item.id}
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
                  <Text>{parseFloat(item.item.price).toFixed(2)}€</Text>
                  <Icon name="close" onPress={() => console.log("pressed")} />
                </View>
              )
            }
          />
        ))}

        <ListItem
          title="Inkl. Mwst"
          rightElement={<Text>{parseFloat(calcMwst()).toFixed(2)}€</Text>}
        />
        <ListItem
          title={<Text style={{ fontWeight: "bold" }}>Summe</Text>}
          rightElement={
            <Text style={{ fontWeight: "bold" }}>
              {parseFloat(calcGrandTotal()).toFixed(2)}€
            </Text>
          }
        />
      </React.Fragment>
    );
  }
}

export default withCartContext(CartOverviewList);

interface IProps {
  cartContext: any;
  viewOnly?: boolean;
}
