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
import OrderDetailScreen from "../screens/orderDetail/OrderDetailScreen";
import { BrandLogo } from "../components/BrandLogo";
import QrCodeScannerScreen from "../screens/qrCodeScanner/QrCodeScannerScreen";

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
    defaultNavigationOptions: {
      headerTitleStyle: { fontWeight: "bold" },
      headerTintColor: "#5BC0EB"
    },
    navigationOptions: {
      drawerLabel: "Restaurants",
      drawerIcon: ({ focused, tintColor }) => (
        <Icon
          style={{ color: tintColor }}
          focused={focused}
          type="MaterialCommunityIcons"
          name="silverware"
        />
      )
    }
  }
);

const MyOrdersStack = createStackNavigator(
  {
    MyOrders: MyOrdersScreen,
    OrderDetail: OrderDetailScreen
  },
  {
    defaultNavigationOptions: {
      headerTitleStyle: { fontWeight: "bold" },
      headerTintColor: "#5BC0EB"
    },
    navigationOptions: {
      drawerLabel: "Bestellungen",
      drawerIcon: ({ focused, tintColor }) => (
        <Icon
          style={{ color: tintColor }}
          focused={focused}
          type="MaterialCommunityIcons"
          name="receipt"
        />
      )
    }
  }
);

const AccountStack = createStackNavigator(
  {
    Account: AccountScreen,
    MyOrders: MyOrdersScreen
  },
  {
    defaultNavigationOptions: {
      headerTitleStyle: { fontWeight: "bold" },
      headerTintColor: "#5BC0EB"
    },
    navigationOptions: {
      drawerLabel: "Account",
      drawerIcon: ({ focused, tintColor }) => (
        <Icon
          style={{ color: tintColor }}
          focused={focused}
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
    contentComponent: props => (
      <View style={{ flex: 1, paddingBottom: 20 }}>
        <Container>
          <View
            style={{
              backgroundColor: "#5BC0EB",
              flex: 0.3,
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontFamily: "Pacifico",
                color: "#fff",
                fontSize: 30,
                alignSelf: "center",
                marginBottom: 1
              }}
            >
              EasyOrder
            </Text>
          </View>

          <DrawerItems {...props} />
        </Container>

        <Button
          block
          bordered
          dark
          style={{ marginBottom: 8, marginLeft: 8, marginRight: 8 }}
        >
          <Text>Logout</Text>
        </Button>
      </View>
    ),
    contentOptions: {
      activeTintColor: "#5BC0EB"
    }
  }
);

export default MainDrawerNavigator;

class HamburgerMenu extends Component {
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };

  render() {
    return (
      <Icon
        button
        type="MaterialCommunityIcons"
        name="menu"
        onPress={() => this.toggleDrawer()}
        style={{ marginLeft: 16, color: "#5BC0EB" }}
      />
    );
  }
}
