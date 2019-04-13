import React, { Component } from "react";
import TableCodeScanner from "./TableCodeScanner";
import { NavigationScreenProps } from "react-navigation";
import { firebaseRestaurants } from "../../config/firebase";
import { Restaurant } from "../../models/Restaurant";
import { withCartContext, CartContextProps } from "../cart/CartContext";

export interface CheckInScreenProps
  extends NavigationScreenProps,
    CartContextProps {}

export interface CheckInScreenState {}

class CheckInScreen extends React.Component<
  CheckInScreenProps,
  CheckInScreenState
> {
  static navigationOptions = {
    header: null
  };

  getRestaurant = async restaurantID => {
    return await firebaseRestaurants
      .doc(restaurantID)
      .get()
      .then(doc => {
        debugger;
        if (doc.exists) {
          const restaurant = { id: doc.id, ...doc.data() };
          return restaurant;
        }
      });
  };

  onScanned = async table => {
    debugger;
    const restaurant = await this.getRestaurant(table.restaurantID);
    console.log("found restaurant", restaurant);
    this.props.cartContext.setTable(table);
    this.props.navigation.navigate("Menu", {
      restaurant: restaurant
    });
  };

  constructor(props: CheckInScreenProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <TableCodeScanner
        onCancel={() => this.props.navigation.navigate("Restaurants")}
        onScanned={this.onScanned}
      />
    );
  }
}

export default withCartContext(CheckInScreen);
