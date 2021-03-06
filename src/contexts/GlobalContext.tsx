import React, { Component, Provider } from "react";
import firebase, { firebaseOrders } from "../config/firebase";

import { MenuItem } from "../models/MenuItem";
import { Restaurant } from "../models/Restaurant";
import globalContexUtils from "./globalContextUtils";
import { Table } from "../models";
import { PaymentMethod } from "../models/PaymentMethod";
import { ProviderProps } from "create-react-context";
import { GlobalContextProps } from "./GlobalContextProps";

const GlobalContext = React.createContext<Partial<GlobalContextProps>>({});

const GlobalContextConsumer = GlobalContext.Consumer;

interface IState {
  user: any;
  cart: {
    item: MenuItem;
    quantity: number;
    comment: string;
  }[];
  selectedRestaurant: Restaurant;
  table: Table;
  paymentMethod: PaymentMethod;
  grandTotal: number;
  status: string;
  numCartItems: number;
}

class GlobalContextProvider extends Component<
  ProviderProps<GlobalContextProps>,
  IState
> {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      cart: [],
      selectedRestaurant: undefined,
      table: undefined,
      paymentMethod: {
        name: "",
        details: {}
      },
      grandTotal: 0,
      status: "",
      numCartItems: 0
    };
  }

  // SetUp Provider
  componentDidMount() {}

  setUser = user => {
    this.setState({ user: user });
  };

  clearUser = () => {
    this.setState({ user: undefined });
  };

  setSelectedRestaurant = (selectedRestaurant: Restaurant) => {
    this.setState({ selectedRestaurant, cart: [] });
  };

  setTable = table => {
    this.setState({ table: table });
  };

  clearContext = () => {
    this.setState({
      cart: [],
      selectedRestaurant: undefined,
      table: undefined,
      paymentMethod: {
        name: "",
        details: {}
      },
      grandTotal: 0,
      status: "",
      numCartItems: 0
    });
  };

  addCartItem = (item: MenuItem, quantity: number, comment: string) => {
    let cart = this.state.cart;

    const itemIndexInCart = cart.findIndex(
      element => element.item.id === item.id
    );

    if (itemIndexInCart >= 0) {
      cart[itemIndexInCart].quantity += quantity;
    } else {
      cart.push({ item: item, quantity: quantity, comment: comment });
    }

    console.log(cart);

    this.updateCart(cart);
  };

  removeCartItem = cartItem => {
    let cart = this.state.cart;
    const itemIndexInCart = cart.findIndex(
      element => element.item.id === cartItem.item.id
    );

    if (itemIndexInCart >= 0) {
      cart.splice(itemIndexInCart, 1);
      this.updateCart(cart);
    }
  };

  getNumOfItemInCart = item => {
    const itemInCart = this.state.cart.find(el => el.item.id == item.id);
    return itemInCart ? itemInCart.quantity : 0;
  };

  /**
   *  @param paymentMethod:
   */
  setPaymentMethod = paymentMethod => {
    this.setState({
      paymentMethod: paymentMethod
    });
  };

  resetSelectedRestaurant = () => {
    this.setState({
      cart: [],
      selectedRestaurant: undefined,
      table: undefined,
      paymentMethod: {
        name: "",
        details: {}
      },
      grandTotal: 0,
      status: "",
      numCartItems: 0
    });
  };

  increaseCartItemQuantity = item => {
    let cart = this.state.cart;
    const itemIndexInCart = cart.findIndex(
      element => element.item.id === item.id
    );

    if (itemIndexInCart >= 0) {
      cart[itemIndexInCart].quantity += 1;

      this.updateCart(cart);
    }
  };

  decreaseCartItemQuantity = item => {
    let cart = this.state.cart;

    const itemIndexInCart = cart.findIndex(
      element => element.item.id === item.id
    );

    if (itemIndexInCart >= 0) {
      let cartItem = cart[itemIndexInCart];

      if (cartItem.quantity === 1) {
        this.removeCartItem(cartItem);
      } else {
        cart[itemIndexInCart].quantity -= 1;
        this.updateCart(cart);
      }
    }
  };

  updateCartItemQuantity = (item, quantity) => {
    let cart = this.state.cart;
    const itemIndexInCart = cart.findIndex(
      element => element.item.id === item.id
    );

    if (itemIndexInCart >= 0) {
      cart[itemIndexInCart].quantity = quantity;
      this.updateCart(cart);
    }
  };

  /**
   * Update cart and assosiated values in state
   */
  updateCart = newCart => {
    this.setState({
      cart: newCart,
      grandTotal: globalContexUtils.calcGrandTotal(newCart),
      numCartItems: globalContexUtils.calcNumCartItems(newCart)
    });
  };

  resetTable = () => {
    this.setState({ table: undefined, cart: [] });
  };

  placeOrder = async () => {
    const {
      selectedRestaurant,
      cart,
      grandTotal,
      paymentMethod,
      table
    } = this.state;

    const order = {
      customerID: firebase.auth().currentUser.uid,
      grandTotal: grandTotal,
      items: cart,
      paymentMethod: paymentMethod,
      restaurant: {
        restaurantID: selectedRestaurant.id,
        name: selectedRestaurant.name,
        logo: selectedRestaurant.media.logo,
        coverPhoto: selectedRestaurant.media.coverPhoto
      },
      orderDate: firebase.firestore.Timestamp.now(),
      status: "open",
      table: table
    };

    return new Promise((resolve, reject) => {
      firebaseOrders
        .add(order)
        .then(docRef => {
          docRef.get().then(doc => {
            this.clearContext();
            resolve({
              ...doc.data(),
              id: doc.id,
              orderDate: doc.data().orderDate.toDate()
            });
          });
        })
        .catch(error => {
          console.warn(error);
          reject(error);
        });
    });
  };

  render() {
    return (
      <GlobalContext.Provider
        value={{
          ...this.state,

          setUser: this.setUser,
          clearUser: this.clearUser,

          setSelectedRestaurant: this.setSelectedRestaurant,
          setPaymentMethod: this.setPaymentMethod,
          setTable: this.setTable,

          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          getNumOfItemInCart: this.getNumOfItemInCart,
          updateCartItemQuantity: this.updateCartItemQuantity,
          increaseCartItemQuantity: this.increaseCartItemQuantity,
          decreaseCartItemQuantity: this.decreaseCartItemQuantity,

          resetSelectedRestaurant: this.resetSelectedRestaurant,
          resetTable: this.resetTable,

          placeOrder: this.placeOrder
        }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

export { GlobalContextProvider, GlobalContextConsumer };
