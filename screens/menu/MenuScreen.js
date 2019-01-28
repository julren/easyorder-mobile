import React from "react";
import { Image, Platform, ScrollView, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
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
import MiniCartOverlay from "../cart/MiniCartOverlay";
import { CartProvider } from "../cart/CartContext";

export default class MenuScreen extends React.Component {
  static navigationOptions = {
    title: "Speisekarte"
  };

  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    let restaurant = this.props.navigation.getParam("restaurant", undefined);
    console.log(restaurant);
    if (!restaurant) return;

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
      </Container>
    );
  }
}
