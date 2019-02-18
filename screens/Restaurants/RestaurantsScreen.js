import React from "react";
import { Image, Platform, ScrollView, StyleSheet } from "react-native";
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
  View,
  Icon
} from "native-base";
import { firebaseRestaurants } from "../../config/firebase";
import RestaurantCard from "./RestaurantCard";
import { MapView } from "expo";
import RestaurantsMap from "./RestaurantsMap";
import { withCartContext } from "../cart/CartContext";

/**
 * Screen that shows List of nearby restaurants
 */
class RestaurantsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Restaurants"
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    };
    this.props.navigation.setParams({ title: "Restaurants" });
  }

  componentDidMount() {
    // Get Restaurants from database
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

    // Consumes Cart Context to be able to clear cart when the user goes back to list from restaurant view
    const cartContext = this.props.cartContext;

    return (
      <Container>
        {/* Helper from react-navigation. When Screen will focus (be active) clear cart of cartContext */}
        <NavigationEvents
          onWillFocus={payload => cartContext.clearCartContext()}
        />

        {/* Kartenansicht der Restaurants */}
        <Content padder>
          {/* <Card>
            <CardItem>
               <RestaurantsMap restaurants={restaurants} />
            </CardItem>
          </Card> */}

          {/* Liste der Restaurantdarstellung rendern */}
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

export default withCartContext(RestaurantsScreen);
