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
  Icon,
  Spinner
} from "native-base";
import { firebaseRestaurants } from "../../config/firebase";
import RestaurantCard from "./RestaurantCard";
import { MapView } from "expo";
import RestaurantsMap from "./RestaurantsMap";
import { withCartContext } from "../cart/CartContext";
import SectionHeader from "../../components/SectionHeader";

/**
 * Screen that shows List of nearby restaurants
 */
class RestaurantsScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: "Restaurants"
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

    if (restaurants.length == 0) return <Spinner />;

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

          <SectionHeader title="Restaurants" icon="silverware" />

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

export interface Props {
  navigation: any;
  cartContext: any;
}
interface State {
  restaurants: Restaurant[];
}

type Restaurant = {
  id: string;
  adress: {
    city: "Landshut";
    lat: "48.5328052";
    lon: "12.149773";
    postcode: "84036";
    street: "Altstadt 34";
  };
  author: string;
  businessHours: [
    {
      closingHour: "23:00";
      day: "monday";
      openingHour: "09:00";
    },
    {
      closingHour: "22:00";
      day: "thuesday";
      openingHour: "11:30";
    }
  ];
  contactInfo: {
    email: string;
    phone: string;
  };
  cuisine: string;
  description: string;
  media: {
    coverPhoto: "https://firebasestorage.googleapis.com/v0/b/***REMOVED***/o/public%2Fimages%2FcoverPhoto-WTpxRrjqspaedb8EnBTMRO1KVDM2.jpg?alt=media&token=66eb5e45-21ce-4782-ad6d-fc5a2a188935";
    logo: "https://firebasestorage.googleapis.com/v0/b/***REMOVED***/o/public%2Fimages%2Flogo-WTpxRrjqspaedb8EnBTMRO1KVDM2.png?alt=media&token=50c1b9d5-c1f0-4b0b-bb1e-ed25c202a5e9";
  };
  name: string;
  priceClass: string;
};
