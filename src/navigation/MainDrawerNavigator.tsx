import React, { Component } from "react";
import { Platform, ScrollView } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  DrawerItems
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import AccountScreen from "../screens/account/AccountScreen";
import RestaurantsScreen from "../screens/restaurants/RestaurantsScreen";
import RestaurantsDetailScreen from "../screens/restaurantDetail/RestaurantDetailScreen";
import MenuScreen from "../screens/menu/MenuScreen";
import CartScreen from "../screens/cart/CartScreen";
import MenuItemDetailScreen from "../screens/menuItemDetail/MenuItemDetailScreen";
import CheckoutScreen from "../screens/checkout/CheckoutScreen";
import OrderOverviewScreen from "../screens/orderOverview/OrderOverviewScreen";
import MyOrdersScreen from "../screens/account/MyOrdersScreen";
import {
  Icon,
  Text,
  Button,
  Content,
  Footer,
  View,
  Container
} from "native-base";
import { BrandLogo } from "../components/BrandLogo";
import QrCodeScannerScreen from "../screens/qrCodeScanner/QrCodeScannerScreen";
import LogoutButton from "../components/LogoutButton";
import Sidebar from "./Sidebar";
import { colors } from "../config/customTheme.js";

const RestaurantStack = createStackNavigator(
  {
    Restaurants: {
      screen: RestaurantsScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HamburgerMenu navigationProps={navigation} />
      })
    },
    RestaurantDetail: RestaurantsDetailScreen,
    Menu: MenuScreen,
    MenuItemDetail: MenuItemDetailScreen,
    Cart: CartScreen,
    Checkout: CheckoutScreen,
    OrderOverview: OrderOverviewScreen,
    QrCodeScanner: QrCodeScannerScreen
  },
  {
    cardStyle: { backgroundColor: colors.grey5 },
    defaultNavigationOptions: {
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
    },
    navigationOptions: {
      drawerLabel: "Restaurants",
      drawerIcon: ({ focused, tintColor }) => (
        <Icon
          style={{ color: tintColor }}
          type="MaterialCommunityIcons"
          name="silverware"
        />
      )
    }
  }
);

const MyOrdersStack = createStackNavigator(
  {
    MyOrders: {
      screen: MyOrdersScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HamburgerMenu navigationProps={navigation} />
      })
    },
    OrderDetail: OrderOverviewScreen
  },
  {
    defaultNavigationOptions: {
      headerTitleStyle: { fontWeight: "bold" },
      headerTintColor: colors.primary
    },
    navigationOptions: {
      drawerLabel: "Bestellungen",
      drawerIcon: ({ focused, tintColor }) => (
        <Icon
          style={{ color: tintColor }}
          type="MaterialCommunityIcons"
          name="receipt"
        />
      )
    }
  }
);

const AccountStack = createStackNavigator(
  {
    Account: {
      screen: AccountScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HamburgerMenu navigationProps={navigation} />
      })
    },
    MyOrders: MyOrdersScreen
  },
  {
    defaultNavigationOptions: {
      headerTitleStyle: { fontWeight: "bold" },
      headerTintColor: colors.primary
    },
    navigationOptions: {
      drawerLabel: "Account",
      drawerIcon: ({ tintColor }) => (
        <Icon
          style={{ color: tintColor }}
          type="MaterialCommunityIcons"
          name="account"
        />
      )
    }
  }
);

const MainDrawerNavigator = createDrawerNavigator(
  {
    RestaurantStack,
    MyOrdersStack,
    AccountStack
  },
  {
    contentComponent: props => <Sidebar {...props} />,
    contentOptions: {
      activeTintColor: colors.primary
    }
  }
);

export default MainDrawerNavigator;

const HamburgerMenu = (props: any) => {
  return (
    <Icon
      type="MaterialCommunityIcons"
      name="menu"
      onPress={() => props.navigationProps.toggleDrawer()}
      style={{ marginLeft: 16, color: "#fff" }}
    />
  );
};
