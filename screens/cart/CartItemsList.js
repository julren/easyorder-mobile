import React, { Component } from "react";
import { Container, Text, List } from "native-base";
import { CartConsumer } from "./CartContext";

class CartItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <CartConsumer>
        {context => (
          <Container>
            {context.cart.length == 0 && <Text>Warenkorb ist leer</Text>}
            {context.cart.length > 0 && (
              <List>
                {context.cart.map((item, index) => (
                  <List.Item>
                    <Text>{item.name}</Text>
                  </List.Item>
                ))}
              </List>
            )}
          </Container>
        )}
      </CartConsumer>
    );
  }
}

export default CartItemsList;
