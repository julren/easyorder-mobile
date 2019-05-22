import React, { Component } from "react";
import { Tab, Tabs } from "../../../components";
import MenuItemReviewsTab from "./MenuItemReviewsTab";
import RestaurantReviewsTab from "./RestaurantReviewsTab";

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
