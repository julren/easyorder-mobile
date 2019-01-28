import React from "react";
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
import { firebaseRestaurants } from "../../config/firebase";
import RestaurantCard from "./RestaurantCard";
import { MapView } from "expo";
import RestaurantsMap from "./RestaurantsMap";

export default class RestaurantsScreen extends React.Component {
  static navigationOptions = {
    title: "Restaurants"
  };

  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    };
  }

  componentDidMount() {
    firebaseRestaurants
      .get()
      .then(querySnapshot => {
        let restaurantsData = [];
        querySnapshot.forEach(function(doc) {
          restaurantsData.push({ id: doc.id, ...doc.data() });
        });
        this.setState({ restaurants: restaurantsData });
      })
      .catch(error => {
        console.error("Error getting document..: ", error);
      });
  }

  render() {
    const { restaurants } = this.state;

    return (
      <Container>
        <Content padder>
          <Text>Restaurants</Text>
          <Card>
            <CardItem>
              {/* <RestaurantsMap restaurants={restaurants} /> */}
            </CardItem>
          </Card>

          {restaurants.map((restaurant, index) => (
            <RestaurantCard
              key={index}
              restaurant={restaurant}
              onRestaurantSelect={() =>
                this.props.navigation.navigate("RestaurantDetail", {
                  restaurant: restaurant
                })
              }
            />
          ))}
        </Content>
      </Container>
    );
  }
}
