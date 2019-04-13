import React, { Component } from "react";
import firebase, {
  firebaseOrders,
  firebaseTables
} from "../../config/firebase";
import {
  NavigationScreenProp,
  NavigationScreenOptions,
  NavigationScreenProps,
  NavigationInjectedProps
} from "react-navigation";
import { any } from "prop-types";
import { Cart } from "../../models/Cart";
import { MenuItem } from "../../models/MenuItem";
import { Restaurant } from "../../models/Restaurant";

const CartContext = React.createContext({});
const CartConsumer = CartContext.Consumer;

export interface CartContext extends Cart {
  setRestaurant: (restaurant: Restaurant) => void;
  setPaymentMethod: (paymentMethod: string) => void;
  setTable: (tableID: string) => void;

  addCartItem: (item: MenuItem, quantity: number) => void;
  removeCartItem: (cartItem: { item: MenuItem; quantity: number }) => void;
  updateCartItemQuantity: (item: MenuItem, quantity: number) => void;
  clearCartContext: () => void;

  placeOrder: () => Promise<any>;
}

export interface CartContextProps {
  cartContext: CartContext;
}

/**
 * Holds Info about currently selected restaurant, added cart items
 * and allows to update/remove them
 */
class CartProvider extends Component<any, Cart> {
  constructor(props) {
    super(props);
    this.state = { cart: [] } as Cart;
  }

  setRestaurant = (restaurant: Restaurant) => {
    this.setState({ restaurant, cart: [] });
  };

  setTable = tableID => {
    console.log("setTable", tableID);
    if (tableID) {
      firebaseTables
        .doc(tableID)
        .get()
        .then(doc => {
          this.setState({
            table: {
              tableID: doc.id,
              name: doc.data().name
            }
          });
        });
    }
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

  /**
   *  @param paymentMethod:
   */
  setPaymentMethod = paymentMethod => {
    this.setState({
      paymentMethod: paymentMethod
    });
  };

  clearCartContext = () => {
    const clearedCart = {
      restaurant: undefined,
      cart: [],
      table: {},
      paymentMethod: ""
    } as Cart;

    this.setState({ ...clearedCart });
  };

  updateCartItemQuantity = (item, quantity) => {
    let cart = this.state.cart;
    const itemIndexInCart = cart.findIndex(
      element => element.item.id === item.id
    );

    if (itemIndexInCart) {
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
      grandTotal: calcGrandTotal(newCart),
      mwst: calcMwst(newCart),
      numCartItems: calcNumCartItems(newCart)
    });
  };

  placeOrder = async () => {
    const { restaurant } = this.state;

    const order = {
      ...this.state,
      restaurant: {
        restaurantID: restaurant.id,
        name: restaurant.name,
        logo: restaurant.media.logo,
        coverPhoto: restaurant.media.coverPhoto
      },

      orderDate: firebase.firestore.Timestamp.now(),
      customerID: firebase.auth().currentUser.uid,
      status: "open"
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

  contextValue: CartContext = {
    ...this.state,

    setRestaurant: this.setRestaurant,
    setPaymentMethod: this.setPaymentMethod,
    setTable: this.setTable,

    addCartItem: this.addCartItem,
    removeCartItem: this.removeCartItem,
    updateCartItemQuantity: this.updateCartItemQuantity,
    clearCartContext: this.clearCartContext,

    placeOrder: this.placeOrder
  };

  render() {
    return (
      <CartContext.Provider value={this.contextValue}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
/**
 * HoC that provides CartContext to other Component
 * @param Component: Child Component to wrap in Cart Context
 */

const withCartContext = <BaseProps extends CartContextProps>(
  Component: React.ComponentType<BaseProps & NavigationScreenProps>
) => {
  class CartConsumerWrapper extends React.Component {
    static navigationOptions: any;
    render() {
      return (
        <CartConsumer>
          {(cartContext: CartContext) => (
            <Component {...this.props as any} cartContext={cartContext} />
          )}
        </CartConsumer>
      );
    }
  }
  //@ts-ignore
  CartConsumerWrapper.navigationOptions = Component.navigationOptions;
  return CartConsumerWrapper;
};

export { CartProvider, CartConsumer, withCartContext };

const placeholderData = {
  cart: [
    {
      item: {
        id: "rBe9Zr3UgxyPZaklXjNK",
        authorID: "WTpxRrjqspaedb8EnBTMRO1KVDM2",
        categoryID: "2fsrzrm1G9kKGBJ7trzD",
        description: "leckerschmecker",
        name: "Bruscetta",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/***REMOVED***/o/public%2Fimages%2FmenuItem-rBe9Zr3UgxyPZaklXjNK.jpg?alt=media&token=385ba19a-fd59-4d7b-9f8e-d29ddb158c4b",
        price: 6.9
      },
      quantity: 1
    },
    {
      item: {
        id: "X9aoZGGWaQJkHFFyJ8fS",
        authorID: "WTpxRrjqspaedb8EnBTMRO1KVDM2",
        categoryID: "2fsrzrm1G9kKGBJ7trzD",
        description: "Aubergine, Paprika, Champignons",
        name: "Antipasti Mista",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/***REMOVED***/o/public%2Fimages%2FmenuItem-X9aoZGGWaQJkHFFyJ8fS.jpg?alt=media&token=986e0a04-7171-4e8e-8b57-4193a44ec901",
        price: 5.9
      },
      quantity: 2
    }
  ],
  restaurant: {
    id: "9kkHKCKHzTUl4sC7uDoD",
    adress: {
      city: "Landshut",
      lat: "48.5328052",
      lon: "12.149773",
      postcode: "84036",
      street: "Altstadt 34"
    },
    author: "WTpxRrjqspaedb8EnBTMRO1KVDM2",
    businessHours: [
      {
        closingHour: "23:00",
        day: "monday",
        openingHour: "09:00"
      },
      {
        closingHour: "22:00",
        day: "thuesday",
        openingHour: "11:30"
      }
    ],
    contactInfo: {
      email: "info@ladolcevita.de",
      phone: "087052732187913"
    },
    cuisine: "Italienisch",
    description: "Italienisches Ambiente mit Steinofen",
    media: {
      coverPhoto:
        "https://firebasestorage.googleapis.com/v0/b/***REMOVED***/o/public%2Fimages%2FcoverPhoto-WTpxRrjqspaedb8EnBTMRO1KVDM2.jpg?alt=media&token=66eb5e45-21ce-4782-ad6d-fc5a2a188935",
      logo:
        "https://firebasestorage.googleapis.com/v0/b/***REMOVED***/o/public%2Fimages%2Flogo-WTpxRrjqspaedb8EnBTMRO1KVDM2.png?alt=media&token=50c1b9d5-c1f0-4b0b-bb1e-ed25c202a5e9"
    },
    name: "La Dolce Vita",
    priceClass: 2,
    rating: {
      overall: 4.2,
      numberOfRatings: 18,
      distribution: [
        {
          starRating: 5,
          numberOfRatings: 20,
          percentage: 0.6
        },
        {
          starRating: 4,
          numberOfRatings: 4,
          percentage: 0.2
        },
        {
          starRating: 3,
          numberOfRatings: 1,
          percentage: 0.1
        },
        {
          starRating: 2,
          numberOfRatings: 1,
          percentage: 0.1
        },
        {
          starRating: 1,
          numberOfRatings: 0,
          percentage: 0
        }
      ]
    }
  },
  table: {
    id: "",
    name: ""
  },
  paymentMethod: "",
  mwst: 0,
  grandTotal: 0,
  status: ""
};

/**
 * HELPER FUNCTIONS
 */

const calcGrandTotal = cart => {
  let grandTotal = 0;

  cart.forEach(element => {
    grandTotal += element.quantity * element.item.price;
  });
  return grandTotal;
};

const calcMwst = cart => {
  return ((calcGrandTotal(cart) * 0, 19) * 100) / 100;
};

const calcNumCartItems = cart => {
  let numCartItems = 0;

  cart.forEach(element => {
    numCartItems += element.quantity;
  });

  return numCartItems;
};
