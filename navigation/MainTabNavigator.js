import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import AccountScreen from "../screens/AccountScreen";
import RestaurantsScreen from "../screens/Restaurants";
import MenuScreen from "../screens/MenuScreen";
import CartScreen from "../screens/CartScreen";
import MenuItemDetailScreen from "../screens/MenuItemDetailScreen";

const RestaurantStack = createStackNavigator({
  Restaurants: RestaurantsScreen,
  Menu: MenuScreen,
  MenuItemDetail: MenuItemDetailScreen,
  Cart: CartScreen
});

RestaurantStack.navigationOptions = {
  tabBarLabel: "Restaurants",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-restaurant" : "md-restaurant"}
    />
  )
};

const AccountStack = createStackNavigator({
  Account: AccountScreen
});

AccountStack.navigationOptions = {
  tabBarLabel: "Account",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-person" : "md-person"}
    />
  )
};

export default createBottomTabNavigator({
  RestaurantStack,
  AccountStack
});
