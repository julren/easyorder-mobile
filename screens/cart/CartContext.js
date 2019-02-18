import React, { Component } from "react";
import firebase, { firebaseOrders } from "../../config/firebase";

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
      cart: [],
      table: "",
      paymentMethod: ""
    };
  }

  setRestaurant = restaurant => {
    if (restaurant.id !== this.state.restaurant.id) {
      this.setState({ restaurant, cart: [] });
    }
  };

  // TODO: Firebase Table abgleich und bezeichnung speichern
  setTable = tableID => {
    if (tableID) {
      this.setState({ table, table });
    }
  };

  addCartItem = (item, quantity) => {
    let cart = this.state.cart;
    cart.push({ item, quantity });

    this.setState({
      cart
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

  removeCartItem = cartItem => {
    let cart = this.state.cart;
    const itemIndexInCart = cart.findIndex(element => element === cartItem);

    if (itemIndexInCart) {
      cart.splice(itemIndexInCart, 1);
      this.setState({
        cart: cart
      });
    }
  };

  setPaymentMethod = paymentMethod => {
    this.setState({
      paymentMethod: paymentMethod
    });
  };

  clearCartContext = () => {
    this.setState({
      restaurant: { id: 0 },
      cart: [],
      table: undefined,
      paymentMethod: undefined
    });
  };

  updateCartItemQuantity = (item, quantity) => {
    let cart = this.state.cart;
    const itemIndexInCart = cart.findIndex(
      element => element.item.id === item.id
    );

    if (itemIndexInCart) {
      cart[itemIndexInCart].quantity = quantity;
      this.setState({
        cart
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

  calcMwst = () => {
    return parseFloat(this.calcGrandTotal() * 0.19).toFixed(2);
  };

  calcNumCartItems = () => {
    let numCartItems = 0;

    this.state.cart.forEach(element => {
      numCartItems += element.quantity;
    });

    return numCartItems;
  };

  /**
   *
   */
  placeOrder = async () => {
    const { restaurant, cart, paymentMethod, table } = this.state;

    const order = {
      restaurant: {
        restaurantID: restaurant.id,
        name: restaurant.name,
        logo: restaurant.media.logo,
        coverPhoto: restaurant.media.coverPhoto
      },
      table: table,
      items: cart,
      grandTotal: this.calcGrandTotal(),
      mwst: this.calcMwst(),
      paymentMethod: paymentMethod,
      orderDate: firebase.firestore.Timestamp.now(),
      customerID: firebase.auth().currentUser.uid
    };

    return new Promise((resolve, reject) => {
      firebaseOrders
        .add(order)
        .then(docRef => {
          resolve(docRef.id);
        })
        .catch(error => {
          console.warn(error);
          reject(error);
        });
    });
  };

  render() {
    const contextValue = {
      cart: this.state.cart,
      restaurant: this.state.restaurant,
      table: this.state.table,
      paymentMethod: this.state.paymentMethod,

      setRestaurant: this.setRestaurant,
      setPaymentMethod: this.setPaymentMethod,
      setTable: this.setState,

      calcGrandTotal: this.calcGrandTotal,
      calcMwst: this.calcMwst,
      calcNumCartItems: this.calcNumCartItems,
      addCartItem: this.addCartItem,
      removeCartItem: this.removeCartItem,
      updateCartItemQuantity: this.updateCartItemQuantity,
      clearCartContext: this.clearCartContext,

      placeOrder: this.placeOrder
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
  class CartConsumerWrapper extends React.Component {
    render() {
      return (
        <CartConsumer>
          {cartContext => (
            <Component {...this.props} cartContext={cartContext} />
          )}
        </CartConsumer>
      );
    }
  }
  CartConsumerWrapper.navigationOptions = Component.navigationOptions;
  return CartConsumerWrapper;
};

export { CartProvider, CartConsumer, withCartContext };
