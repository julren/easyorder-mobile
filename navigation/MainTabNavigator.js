import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import AccountScreen from "../screens/account/AccountScreen";
import RestaurantsScreen from "../screens/restaurants/RestaurantsScreen";
import RestaurantsDetailScreen from "../screens/restaurantDetail/RestaurantDetailScreen";
import MenuScreen from "../screens/menu/MenuScreen";
import CartScreen from "../screens/cart/CartScreen";
import MenuItemDetailScreen from "../screens/menuItemDetail/MenuItemDetailScreen";
import CheckoutScreen from "../screens/checkout/CheckoutScreen";

const RestaurantStack = createStackNavigator({
  Restaurants: RestaurantsScreen,
  RestaurantDetail: RestaurantsDetailScreen,
  Menu: MenuScreen,
  MenuItemDetail: MenuItemDetailScreen,
  Cart: CartScreen,
  Checkout: CheckoutScreen
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
