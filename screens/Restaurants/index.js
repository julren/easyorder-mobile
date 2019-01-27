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
import RestaurantCard from "./Restaurant";
import { MapView } from "expo";
import RestaurantsMap from "./RestaurantsMap";

export default class RestaurantsScreen extends React.Component {
  static navigationOptions = {
    title: "Restaurants"
  };

  constructor(props) {
    super(props);
    this.state = {
      restaurant: {
        author: "WTpxRrjqspaedb8EnBTMRO1KVDM2",
        email: "food@dolcevita.com",
        city: "Ergolding",
        closingDay: "saturday",
        closingHour: "22:00",
        city: "Ergolding",
        closingDay: "saturday",
        closingHour: "22:00",
        email: "jul.renner@gmail.com",
        imageURLs: (2)[
          ("https://firebasestorage.googleapis.com/v0/b/easyor…=media&token=512c71ba-1687-4711-9ae5-fd1c55b6be2c",
          "https://firebasestorage.googleapis.com/v0/b/easyor…=media&token=82b46925-c646-4fda-af89-aa2c1b37ed03")
        ],
        name: "Dolce Vita",
        openingDay: "monday",
        openingHour: "09:00",
        phone: "1631742422",
        photos: "",
        postcode: "84030",
        street: "Fürstenstr. 14"
      }
    };
  }

  componentDidMount() {
    firebaseRestaurants
      .doc("38J1LH5yiuhY3qErTP3v")
      .get()
      .then(doc => {
        console.log("got data ", doc.data());
        this.setState({ restaurant: doc.data() });
      })
      .catch(error => {
        console.error("Error getting document..: ", error);
      });
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Text>Restaurants</Text>
          <Card>
            <CardItem style={styles.mapContainer}>
              <RestaurantsMap />
            </CardItem>
          </Card>

          {[...Array(10)].map((_, index) => (
            <RestaurantCard
              key={index}
              restaurant={this.state.restaurant}
              onViewMenu={() => {
                this.props.navigation.navigate("Menu");
              }}
            />
          ))}
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
  mapContainer: {
    height: 200
  }
});
