import React, { Component } from "react";
import MenuItemReviewsTab from "./MenuItemReviewsTab";
import RestaurantReviewsTab from "./RestaurantReviewsTab";
import Tabs from "../../../components/basic/Tabs";
import Tab from "../../../components/basic/Tab";

export interface Props {}

export interface State {}

class MyReviewsScreen extends Component<Props, State> {
  static navigationOptions = {
    title: "Bewertungen"
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
