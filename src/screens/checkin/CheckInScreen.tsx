import React, { Component } from "react";
import TableCodeScanner from "./TableCodeScanner";
import { NavigationScreenProps, NavigationScreenProp } from "react-navigation";
import { firebaseRestaurants } from "../../config/firebase";
import withGlobalContext from "../../contexts/withGlobalContext";
import { GlobalContext } from "../../contexts/GlobalContext";

export interface CheckInScreenProps {
  navigation: NavigationScreenProp<any>;
  globalContext: GlobalContext;
}

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

  onScanned = async result => {
    const { restaurantDoc, tableDoc } = result;

    this.props.globalContext.setTable({ id: tableDoc.id, ...tableDoc.data() });
    this.props.navigation.navigate("Menu", {
      restaurant: { id: restaurantDoc.id, ...restaurantDoc.data() }
    });
  };

  constructor(props: CheckInScreenProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <TableCodeScanner
        withText={true}
        onCancel={() => this.props.navigation.navigate("Restaurants")}
        onScanned={this.onScanned}
      />
    );
  }
}

export default withGlobalContext(CheckInScreen);
