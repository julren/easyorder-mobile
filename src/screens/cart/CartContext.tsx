import React, { Component } from "react";
import firebase, { firebaseOrders } from "../../config/firebase";
import { NavigationScreenProp } from "react-navigation";

const CartContext = React.createContext({});
const CartConsumer = CartContext.Consumer;

/**
 * TODO: Refactor. Calc-Methoden nicht nach außen zeigen, sondern nur intern berechnen
 * Context provider for app wide cart Info.
 * Holds Info about currently selected restaurant, added cart items
 * and allows to update/remove them
 */
class CartProvider extends Component<IProps, Cart> {
  constructor(props) {
    super(props);
    this.state = placeholderData;
  }

  setRestaurant = restaurant => {
    this.setState({ restaurant, cart: [] });
  };

  // TODO: Firebase Table abgleich und bezeichnung speichern
  setTable = tableID => {
    console.log("setTable", tableID);
    if (tableID) {
      this.setState({ table: tableID });
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
      restaurant: undefined,
      cart: [],
      table: "",
      paymentMethod: ""
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

  calcGrandTotal = (): number => {
    let grandTotal = 0;

    this.state.cart.forEach(element => {
      grandTotal += element.quantity * element.item.price;
    });
    return grandTotal;
  };

  calcMwst = (): number => {
    return this.calcGrandTotal() * 0.19;
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
      setTable: this.setTable,

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
    static navigationOptions: any;
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

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

const placeholderData: Cart = {
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
  table: "",
  paymentMethod: "",
  mwst: 0,
  grandTotel: 0
};
