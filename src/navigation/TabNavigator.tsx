import React, { Component } from "react";
import { Platform, ScrollView } from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from "react-navigation";

import AccountScreen from "../screens/account/AccountScreen";
import RestaurantsScreen from "../screens/restaurants/RestaurantsScreen";
import RestaurantsDetailScreen from "../screens/restaurants/restaurantDetail/RestaurantDetailScreen";
import MenuScreen from "../screens/menu/MenuScreen";
import CartScreen from "../screens/cart/CartScreen";

import { BrandLogo } from "../components/basic/BrandLogo";
import LogoutButton from "../components/basic/LogoutButton";
import { colors } from "../config/customTheme.js";
import RestaurantsMapScreen from "../screens/restaurants/RestaurantsMapScreen";
import AccountSettingsScreen from "../screens/account/AccountSettingsScren";
import ImprintScreen from "../screens/account/ImprintScreen";
import PrivacyScreen from "../screens/account/PrivacyScreen";
import ContactScreen from "../screens/account/ContactScreen";
import MyReviewsScreen from "../screens/account/myReviews/MyReviewsScreen";
import { Icon } from "react-native-elements";
import TabBarIcon from "./TabBarIcon";
import CheckInScreen from "../screens/checkin/CheckInScreen";
import OrdersScreen from "../screens/orders/OrdersScreen";
import OrderDetailScreen from "../screens/orders/OrderDetailScreen";
import OrderConfirmationScreen from "../screens/orderConfirmation/OrderConfirmationScreen";
import CheckoutScreen from "../screens/checkout/CheckoutScreen";
import CreditCardScreen from "../screens/account/CreditCardScreen";

const sharedNavigationOptions = {
  headerStyle: {
    // elevation: 0, // remove shadow on Android
    // shadowOpacity: 0, // remove shadow on iOS
    // borderBottomWidth: 0
    backgroundColor: colors.primary
  },
  headerTitleStyle: {
    fontFamily: "ProximaNova_bold"
  },
  headerTintColor: "#fff"
};

const RestaurantStack = createStackNavigator(
  {
    Restaurants: RestaurantsScreen,
    RestaurantDetail: RestaurantsDetailScreen,
    RestaurantsMap: RestaurantsMapScreen,
    Menu: MenuScreen,
    Cart: CartScreen,
    Checkout: CheckoutScreen,
    OrderConfirmation: OrderConfirmationScreen,
    CheckIn: CheckInScreen
  },
  {
    cardStyle: { backgroundColor: colors.grey5 },
    defaultNavigationOptions: {
      ...sharedNavigationOptions
    },
    navigationOptions: {
      tabBarLabel: "Restaurants",
      tabBarIcon: tabBarIconProps => (
        <TabBarIcon name="local-dining" {...tabBarIconProps} />
      )
    }
  }
);

const OrdersStack = createStackNavigator(
  {
    Orders: OrdersScreen,
    OrderDetail: OrderDetailScreen
  },
  {
    cardStyle: { backgroundColor: colors.grey5 },
    defaultNavigationOptions: {
      ...sharedNavigationOptions
    },
    navigationOptions: {
      tabBarLabel: "Bestellungen",
      tabBarIcon: tabBarIconProps => (
        <TabBarIcon name="receipt" {...tabBarIconProps} />
      )
    }
  }
);

const AccountStack = createStackNavigator(
  {
    Account: AccountScreen,
    AccountSettings: AccountSettingsScreen,
    CreditCard: CreditCardScreen,
    MyReviews: MyReviewsScreen,
    Imprint: ImprintScreen,
    Privacy: PrivacyScreen,
    Contact: ContactScreen
  },
  {
    cardStyle: { backgroundColor: colors.grey5 },
    defaultNavigationOptions: {
      ...sharedNavigationOptions
    },
    navigationOptions: {
      tabBarLabel: "Account",
      tabBarIcon: tabBarIconProps => (
        <TabBarIcon name="person" {...tabBarIconProps} />
      )
    }
  }
);

const CheckInStack = createStackNavigator(
  {
    CheckIn: CheckInScreen
  },
  {
    navigationOptions: {
      tabBarVisible: false,
      tabBarLabel: "CheckIn",
      tabBarIcon: tabBarIconProps => (
        <TabBarIcon
          name="qrcode-scan"
          {...tabBarIconProps}
          type="material-community"
        />
      )
    }
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    RestaurantStack,
    OrdersStack,
    CheckInStack,
    AccountStack
  },
  {
    tabBarOptions: {
      activeTintColor: colors.primary
    }
  }
);

export default TabNavigator;