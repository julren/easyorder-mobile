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
import {
  Container,
  Content,
  Text,
  Button,
  Card,
  CardItem,
  Left,
  Right,
  Body,
  Header,
  Icon,
  Tab,
  Tabs,
  ScrollableTab,
  Thumbnail,
  List,
  ListItem
} from "native-base";
import { firebaseMenuCategories } from "../../config/firebase";
import MenuItemList from "./MenuItemList";
import { CartConsumer, withCartContext } from "../cart/CartContext";
import MiniCartOverlay from "../cart/MiniCartOverlay";

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
      .where("authorID", "==", restaurant.author)
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
      <Container>
        <Tabs renderTabBar={() => <ScrollableTab />}>
          {this.state.categories.map((category, index) => (
            <Tab heading={category.name} key={index}>
              <Content>
                <MenuItemList categoryID={category.id} />
              </Content>
            </Tab>
          ))}
        </Tabs>

        <React.Fragment>
          {cart.length > 0 && (
            <MiniCartOverlay
              cart={cart}
              onPress={() => {
                this.props.navigation.navigate("Cart");
              }}
            />
          )}
        </React.Fragment>
      </Container>
    );
  }
}

export default withCartContext(MenuScreen);
