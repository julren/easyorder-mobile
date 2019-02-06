import React, { Component } from "react";
import MiniCartOverlay from "./MiniCartOverlay";
import { Text } from "native-base";

const CartContext = React.createContext({});
const CartConsumer = CartContext.Consumer;

/**
 * Context provider for app wide cart Info.
 * Holds Info about currently selected restaurant, added cart items
 * and allows to update/remove them
 */
class CartProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: { id: 0 },
      cart: []
    };
  }

  setRestaurant = restaurant => {
    if (restaurant.id !== this.state.restaurant.id) {
      this.setState({ restaurant: restaurant, cart: [] });
    }
  };

  addCartItem = (item, quantity) => {
    let cart = this.state.cart;
    cart.push({ item: item, quantity: quantity });

    this.setState({
      cart: cart
    });

    // const itemIndexInCart = cart.findIndex(
    //   element => element.item.id === item.id
    // );

    // if (itemIndexInCart >= 0) {
    //   cart[itemIndexInCart].quantity ;
    // } else {
    //   cart.push({ item: item, quantity: 1 });
    // }
    // this.setState({
    //   cart: cart
    // });
  };

  removeCartItem = item => {
    let cart = this.state.cart;
    const itemIndexInCart = cart.findIndex(
      element => element.item.id === item.id
    );

    if (itemIndexInCart) {
      cart.splice(itemIndexInCart, 1);
      this.setState({
        cart: cart
      });
    }
  };

  clearCartAndRestaurant = () => {
    this.setState({ cart: [], restaurant: {} });
  };

  updateCartItemQuantity = (item, quantity) => {
    let cart = this.state.cart;
    const itemIndexInCart = cart.findIndex(
      element => element.item.id === item.id
    );

    if (itemIndexInCart) {
      cart[itemIndexInCart].quantity = quantity;
      this.setState({
        cart: cart
      });
    }
  };

  calcGrandTotal = () => {
    let grandTotal = 0;

    this.state.cart.forEach(element => {
      grandTotal += element.quantity * element.item.price;
    });
    return parseFloat(grandTotal).toFixed(2);
  };

  calcNumCartItems = () => {
    let numCartItems = 0;

    this.state.cart.forEach(element => {
      numCartItems += element.quantity;
    });

    return numCartItems;
  };

  render() {
    const contextValue = {
      cart: this.state.cart,
      restaurant: this.state.restaurant,
      calcGrandTotal: this.calcGrandTotal,
      calcNumCartItems: this.calcNumCartItems,
      addCartItem: this.addCartItem,
      removeCartItem: this.removeCartItem,
      updateCartItemQuantity: this.updateCartItemQuantity,
      setRestaurant: this.setRestaurant,
      clearCartAndRestaurant: this.clearCartAndRestaurant
    };

    return (
      <CartContext.Provider value={contextValue}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
/**
 * HoC that provides CartContext to other Component
 * @param Component: Child Component to wrap in Cart Context
 */
const withCartContext = Component => {
  return props => (
    <CartConsumer>
      {cartContext => <Component {...props} cartContext={cartContext} />}
    </CartConsumer>
  );
};

export { CartProvider, CartConsumer, withCartContext };
