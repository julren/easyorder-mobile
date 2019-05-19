import React, { Component } from "react";
import firebase, {
  firebaseOrders,
  firebaseRestaurants
} from "../config/firebase";
import {
  NavigationScreenProp,
  NavigationScreenOptions,
  NavigationScreenProps,
  NavigationInjectedProps
} from "react-navigation";
import { any } from "prop-types";
import { MenuItem } from "../models/MenuItem";
import { Restaurant } from "../models/Restaurant";
import globalContexUtils from "./globalContextUtils";
import { Table } from "../models";
import CartOverviewList from "../screens/checkout/CartItemsSummaryList";
import { AsyncStorage } from "react-native";
import { PaymentMethod } from "../models/PaymentMethod";

const GlobalContext = React.createContext<Partial<GlobalContext>>({});

const GlobalContextConsumer = GlobalContext.Consumer;

export interface GlobalContext {
  user: any;
  restaurants: Restaurant[];
  cart: {
    item: MenuItem;
    quantity: number;
  }[];
  selectedRestaurant: Restaurant;
  table: Table;
  paymentMethod: PaymentMethod;
  mwst: number;
  grandTotal: number;
  status: string;
  numCartItems: number;

  setUser: (user) => void;
  clearUser: () => void;

  setSelectedRestaurant: (selectedRestaurant: Restaurant) => void;
  setPaymentMethod: (paymentMethod: PaymentMethod) => void;
  setTable: (tableID: string) => void;

  addCartItem: (item: MenuItem, quantity: number) => void;
  removeCartItem: (cartItem: { item: MenuItem; quantity: number }) => void;
  getNumOfItemInCart: (item: MenuItem) => number;
  updateCartItemQuantity: (item: MenuItem, quantity: number) => void;
  decreaseCartItemQuantity: (item: MenuItem) => void;
  increaseCartItemQuantity: (item: MenuItem) => void;

  resetSelectedRestaurant: () => void;
  resetTable: () => void;

  placeOrder: () => Promise<any>;
}

class GlobalContextProvider extends Component<any, any> {
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
      mwst: 0,
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

  addCartItem = (item: MenuItem, quantity: number) => {
    let cart = this.state.cart;

    const itemIndexInCart = cart.findIndex(
      element => element.item.id === item.id
    );

    if (itemIndexInCart >= 0) {
      cart[itemIndexInCart].quantity += quantity;
    } else {
      cart.push({ item: item, quantity: quantity });
    }

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
      restaurant: undefined,
      table: undefined,
      paymentMethod: {},
      mwst: 0,
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
      mwst: globalContexUtils.calcMwst(newCart),
      numCartItems: globalContexUtils.calcNumCartItems(newCart)
    });
  };

  resetTable = () => {
    this.setState({ table: undefined });
  };

  placeOrder = async () => {
    const {
      selectedRestaurant,
      cart,
      grandTotal,
      mwst,
      paymentMethod,
      table
    } = this.state;

    const order = {
      customerID: firebase.auth().currentUser.uid,
      grandTotal: grandTotal,
      items: cart,
      mwst: mwst,
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
