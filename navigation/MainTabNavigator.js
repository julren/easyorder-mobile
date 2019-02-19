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
import OrderOverviewScreen from "../screens/orderOverviewScreen/OrderOverviewScreen";
import { LinearGradient } from "expo";
import MyOrdersScreen from "../screens/account/MyOrdersScreen";

const RestaurantStack = createStackNavigator(
  {
    Restaurants: RestaurantsScreen,
    RestaurantDetail: RestaurantsDetailScreen,
    Menu: MenuScreen,
    MenuItemDetail: MenuItemDetailScreen,
    Cart: CartScreen,
    Checkout: CheckoutScreen,
    OrderOverview: OrderOverviewScreen
  },
  {
    defaultNavigationOptions: {
      headerTitleStyle: { fontWeight: "bold" },
      headerTintColor: "#5BC0EB"
    }
  }
);

RestaurantStack.navigationOptions = {
  tabBarLabel: "Restaurants",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-restaurant" : "md-restaurant"}
    />
  )
};

const AccountStack = createStackNavigator(
  {
    Account: AccountScreen,
    MyOrders: MyOrdersScreen
  },
  {
    defaultNavigationOptions: {
      headerTitleStyle: { fontWeight: "bold" }
    }
  }
);

AccountStack.navigationOptions = {
  tabBarLabel: "Account",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-person" : "md-person"}
    />
  )
};

const MainTabNavigator = createBottomTabNavigator({
  RestaurantStack,
  AccountStack
});

export default MainTabNavigator;
