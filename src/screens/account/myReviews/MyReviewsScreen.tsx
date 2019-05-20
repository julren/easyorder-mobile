import React, { Component } from "react";
import Container from "../../../components/basic/Container";
import StarRating from "react-native-star-rating";
import { Text, ListItem, Icon, Badge } from "react-native-elements";
import firebase, {
  firebaseMenuItemReviews,
  firebaseRestaurantReviews
} from "../../../config/firebase";
import { RestaurantReview } from "../../../models/RestaurantReview";
import { FlatList, View } from "react-native";

import { Tabs, Tab } from "../../../components";
import RestaurantReviewsTab from "./RestaurantReviewsTab";
import MenuItemReviewsTab from "./MenuItemReviewsTab";

export interface Props {}

export interface State {}

class MyReviewsScreen extends Component<Props, State> {
  static navigationOptions = {
    title: "Meine Bewertungen"
  };

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Tabs>
        <Tab tabLabel="Restaurants" fixedView>
          <RestaurantReviewsTab />
        </Tab>
        <Tab tabLabel="Gerichte" fixedView>
          <MenuItemReviewsTab />
        </Tab>
      </Tabs>
    );
  }
}

export default MyReviewsScreen;
