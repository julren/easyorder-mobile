import React, { Component } from "react";
import {
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Text,
  Right
} from "native-base";
import { withCartContext } from "./CartContext";

class CartOverviewList extends Component {
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
      <List>
        {cart.map((element, index) => (
          <ListItem noIndent thumbnail key={index}>
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
                {parseFloat(element.quantity * element.item.price).toFixed(2)}€
              </Text>
            </Right>
          </ListItem>
        ))}

        <ListItem noIndent>
          <Left>
            <Text>Inkl. Mwst</Text>
          </Left>
          <Right>
            <Text>{calcMwst()}€</Text>
          </Right>
        </ListItem>
        <ListItem noIndent>
          <Left>
            <Text style={{ fontWeight: "bold" }}>Summe</Text>
          </Left>
          <Right>
            <Text style={{ fontWeight: "bold" }}>{calcGrandTotal()}€</Text>
          </Right>
        </ListItem>
      </List>
    );
  }
}

export default withCartContext(CartOverviewList);
