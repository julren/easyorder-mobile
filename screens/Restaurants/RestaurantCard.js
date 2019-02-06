import React from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  View,
  H3
} from "native-base";
import StarRating from "react-native-star-rating";
import { StyleSheet, Image } from "react-native";
import { displayNameForPriceClass } from "../../utils/dataPipes";
class RestaurantCard extends React.Component {
  render() {
    // TODO: distance, rating
    const distance = 1.2;
    const rating = 4;
    const { restaurant, onRestaurantSelect } = this.props;
    const { name, priceClass, desc, cuisine, businessHours } = restaurant;
    const { email, phone } = restaurant.contactInfo;
    const { city, street, postcode } = restaurant.adress;

    return (
      <Card>
        <CardItem cardBody button onPress={onRestaurantSelect}>
          <Image
            source={{
              uri: restaurant.media.coverPhoto
            }}
            style={{ height: 150, width: null, flex: 1 }}
          />
        </CardItem>

        <CardItem style={{ paddingTop: 15, paddingBottom: 15 }}>
          <Body>
            <H3 style={{ fontWeight: "bold" }}>{name}</H3>
            <Text style={{ fontSize: 12 }}>
              {distance}km - {cuisine} - {displayNameForPriceClass(priceClass)}
            </Text>
          </Body>
          <Right>
            <StarRating
              starSize={15}
              maxStarts={5}
              halfStarEnabled={true}
              rating={rating}
              fullStarColor="#FFD700"
              emptyStarColor="#d3d3d3"
            />
          </Right>
        </CardItem>
      </Card>
    );
  }
}

export default RestaurantCard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});

const placeholderRestaurantValues = {
  name: "",
  desc: "",
  cuisine: "",
  priceClass: "",
  adress: {
    street: "",
    postcode: "",
    city: ""
  },
  contactInfo: {
    email: "",
    phone: ""
  },
  businessHours: [
    {
      day: "",
      openingHour: "",
      closingHour: ""
    }
  ],
  media: {
    coverPhoto: "",
    logo: ""
  }
};
