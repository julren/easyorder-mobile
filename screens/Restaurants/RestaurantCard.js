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
  H3
} from "native-base";
import StarRating from "react-native-star-rating";
import { StyleSheet, Image } from "react-native";

class RestaurantCard extends React.Component {
  render() {
    const { restaurant, onRestaurantSelect } = this.props;
    return (
      <Card>
        <CardItem cardBody button onPress={onRestaurantSelect}>
          <Image
            source={{
              uri: restaurant.media.coverPhoto
            }}
            style={{ height: 200, width: null, flex: 1 }}
          />
        </CardItem>

        <CardItem style={{ paddingBottom: 0 }}>
          <Body>
            <Text style={{ fontWeight: "400", fontSize: 18 }}>
              {restaurant.name}
            </Text>
            <Text style={{ fontSize: 12 }}>{restaurant.desc}</Text>
          </Body>
          <Right>
            <StarRating
              starSize={10}
              maxStarts={5}
              halfStarEnabled={true}
              rating={4.5}
              fullStarColor="#FFD700"
              emptyStarColor="#d3d3d3"
            />
          </Right>
        </CardItem>
        <CardItem style={{ paddingTop: 5, color: "#37474f" }}>
          <Text>{restaurant.city}</Text>
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
