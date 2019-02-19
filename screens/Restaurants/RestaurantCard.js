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
            style={styles.coverPhoto}
          />
        </CardItem>

        <CardItem style={{ paddingBottom: 0 }}>
          <Body>
            <H3>{name}</H3>
          </Body>
          <Right>
            <StarRating
              starSize={14}
              maxStarts={5}
              halfStarEnabled={true}
              rating={rating}
              fullStarColor="#FFD700"
              emptyStarColor="#d3d3d3"
            />
          </Right>
        </CardItem>

        <CardItem>
          <Body>
            <Text note>Geöffnet bis 19:00 Uhr</Text>
            <Text note>
              {distance}km entfernt | {cuisine} |
              {displayNameForPriceClass(priceClass)}
            </Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}

export default RestaurantCard;
const styles = StyleSheet.create({
  coverPhoto: { height: 150, width: null, flex: 1 },
  cardHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
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
