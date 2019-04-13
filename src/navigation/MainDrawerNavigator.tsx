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
import OrderOverviewScreen from "../screens/orderOverview/OrderOverviewScreen";

import { BrandLogo } from "../components/BrandLogo";
import LogoutButton from "../components/LogoutButton";
import Sidebar from "./Sidebar";
import { colors } from "../config/customTheme.js";
import RestaurantsMapScreen from "../screens/restaurants/RestaurantsMapScreen";
import AccountSettingsScreen from "../screens/account/AccountSettingsScren";
import ImprintScreen from "../screens/account/ImprintScreen";
import PrivacyScreen from "../screens/account/PrivacyScreen";
import ContactScreen from "../screens/account/ContactScreen";
import MyReviewsScreen from "../screens/account/MyReviewsScreen";
import { Icon } from "react-native-elements";
import TabBarIcon from "./TabBarIcon";
import CheckInScreen from "../screens/checkin/CheckInScreen";
import OrdersScreen from "../screens/orders/OrdersScreen";

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
    Restaurants: {
      screen: RestaurantsScreen
    },
    RestaurantDetail: RestaurantsDetailScreen,
    Menu: MenuScreen,
    Cart: CartScreen,
    OrderOverview: OrderOverviewScreen,
    CheckIn: CheckInScreen,
    RestaurantsMap: RestaurantsMapScreen
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
    OrderDetail: OrderOverviewScreen
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
      tabBarLabel: "Code Scannen",
      tabBarIcon: tabBarIconProps => (
        <TabBarIcon name="scan1" {...tabBarIconProps} type="antdesign" />
      )
    }
  }
);

const MainDrawerNavigator = createBottomTabNavigator(
  {
    RestaurantStack,
    OrdersStack,
    AccountStack,
    CheckInStack
  },
  {
    tabBarOptions: {
      activeTintColor: colors.primary
    }
  }
);

export default MainDrawerNavigator;

// const HamburgerMenu = (props: any) => {
//   return (
//     <Icon
//       type="material-community"
//       name="menu"
//       onPress={() => props.navigationProps.toggleDrawer()}
//       iconStyle={{ marginLeft: 16, color: "#fff" }}
//     />
//   );
// };
