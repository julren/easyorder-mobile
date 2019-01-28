import React, { Component } from "react";
import MiniCartOverlay from "./MiniCartOverlay";
import { Text } from "native-base";

const CartContext = React.createContext({});
const CartConsumer = CartContext.Consumer;

class CartProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };
  }

  addCartItem = item => {
    this.setState({ cart: [...this.state.cart, item] });
  };

  removeCartItem = item => {
    this.setState(prevState => {
      const filtedCart = prevState.cart.filter(obj => obj != item);
      return { cart: filtedCart };
    });
  };

  render() {
    return (
      <CartContext.Provider
        value={{
          cart: this.state.cart,
          addCartItem: this.addCartItem
        }}
      >
        {this.props.children}

        {this.state.cart.length > 0 && (
          <MiniCartOverlay cart={this.state.cart} />
        )}
      </CartContext.Provider>
    );
  }
}

export { CartProvider, CartConsumer };
