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
  constructor(props) {
    super(props);
  }

  render() {
    const { restaurant } = this.props;
    return (
      <Card>
        <CardItem cardBody button onPress={this.props.onViewMenu}>
          <Image
            source={{
              uri:
                "https://media-cdn.tripadvisor.com/media/photo-s/0e/cc/0a/dc/restaurant-chocolat.jpg"
            }}
            style={{ height: 200, width: null, flex: 1 }}
          />
        </CardItem>

        <CardItem style={{ paddingBottom: 0 }}>
          <Body>
            <Text style={{ fontWeight: "400", fontSize: 18 }}>
              {restaurant.name}
            </Text>
          </Body>
          <Right>
            <StarRating
              starSize={20}
              maxStarts={5}
              rating={4}
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
