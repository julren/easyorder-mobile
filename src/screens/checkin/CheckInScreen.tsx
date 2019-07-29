import React from "react";
import {
  NavigationScreenProps,
  StackActions,
  NavigationActions
} from "react-navigation";
import { firebaseRestaurants } from "../../config/firebase";
import withGlobalContext, {
  WithGlobalContextProps
} from "../../contexts/withGlobalContext";
import TableCodeScanner from "./TableCodeScanner";

interface IProps extends NavigationScreenProps<any>, WithGlobalContextProps {}

export interface IState {}

class CheckInScreen extends React.Component<IProps, IState> {
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

    this.props.navigation.navigate("Menu", {
      restaurant: { id: restaurantDoc.id, ...restaurantDoc.data() }
    });

    this.props.globalContext.setTable({ id: tableDoc.id, ...tableDoc.data() });
  };

  constructor(props) {
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
