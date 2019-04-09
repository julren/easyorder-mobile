import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Modal
} from "react-native";
import PropTypes from "prop-types";
import { NavigationEvents } from "react-navigation";
import { Tab, Tabs, ScrollableTab } from "native-base";
import { firebaseMenuCategories } from "../../config/firebase";
import MenuItemList from "./MenuItemList";
import { CartConsumer, withCartContext } from "../cart/CartContext";
import MiniCartOverlay from "../cart/MiniCartOverlay";
import { ThemeConsumer } from "react-native-elements";

class MenuScreen extends React.Component {
  static navigationOptions = {
    title: "Speisekarte"
  };

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      cart: []
    };
  }

  componentDidMount() {
    let restaurant = this.props.navigation.getParam("restaurant", undefined);
    if (!restaurant) return;

    const cartContext = this.props.cartContext;
    cartContext.setRestaurant(restaurant);

    firebaseMenuCategories
      .where("authorID", "==", restaurant.authorID)
      .get()
      .then(querySnapshot => {
        let categories = [];

        querySnapshot.forEach(doc => {
          categories.push({ id: doc.id, ...doc.data() });
        });

        this.setState({ categories: categories });
      });
  }

  render() {
    const { cart } = this.props.cartContext;

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <React.Fragment>
            <Tabs
              tabBarUnderlineStyle={{
                backgroundColor: theme.colors.primary
              }}
              tabBarBackgroundColor={theme.colors.grey5}
              renderTabBar={() => <ScrollableTab />}
            >
              {this.state.categories.map((category, index) => (
                <Tab
                  heading={category.name}
                  key={index}
                  activeTextStyle={{ color: theme.colors.primary }}
                >
                  <MenuItemList categoryID={category.id} />
                </Tab>
              ))}
            </Tabs>

            {cart.length > 0 && (
              <MiniCartOverlay
                cart={cart}
                onPress={() => {
                  this.props.navigation.navigate("Cart");
                }}
              />
            )}
          </React.Fragment>
        )}
      </ThemeConsumer>
    );
  }
}

export default withCartContext(MenuScreen);
