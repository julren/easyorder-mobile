import React, { Component } from "react";
import { Image, Platform, ScrollView, StyleSheet, View } from "react-native";
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
  Icon
} from "native-base";

class RestaurantDetailScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const restaurant = this.props.navigation.getParam("restaurant", "{}");

    return (
      <Container>
        <Text>RestaurantDetailsScreen</Text>
        <Text>{restaurant.name}</Text>
        <Button
          onPress={() =>
            this.props.navigation.navigate("Menu", {
              restaurant: restaurant
            })
          }
        >
          <Text>Speisekarte</Text>
        </Button>
      </Container>
    );
  }
}

export default RestaurantDetailScreen;
