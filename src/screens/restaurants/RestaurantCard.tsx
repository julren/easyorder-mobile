import React, { Component } from "react";
import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import StarRating from "react-native-star-rating";

import {
  Card,
  ListItem,
  Button,
  Icon,
  Text,
  Rating,
  ThemeConsumer
} from "react-native-elements";
import { Restaurant } from "../../models/Restaurant";
import { displayNameForPriceCategory } from "../../config/displayNamesForValues";
import CacheImage from "../../components/basic/CachedImage";
import { TextNote } from "../../components";
import Row from "../../components/basic/Row";

interface IProps {
  restaurant: Restaurant;
  onRestaurantSelect: (e) => void;
}

class RestaurantCard extends Component<IProps> {
  render() {
    // TODO: distance, rating

    const distance = 1.2;
    const rating = 4;
    const { restaurant, onRestaurantSelect } = this.props;
    const { name, priceClass, cuisine } = restaurant;
    const { coverPhoto, logo } = restaurant.media;

    return (
      <TouchableOpacity onPress={onRestaurantSelect}>
        <Card image={{ uri: coverPhoto }} imageStyle={styles.coverPhoto}>
          <ListItem
            bottomDivider={false}
            containerStyle={{ paddingHorizontal: 0, paddingVertical: 0 }}
            title={
              <View>
                <Text h2>{name}</Text>
                <Row>
                  <Text style={{ color: "grey", fontSize: 12, marginRight: 4 }}>
                    {rating.toFixed(1)}
                  </Text>
                  <StarRating
                    disabled
                    containerStyle={{ justifyContent: "flex-start" }}
                    starSize={12}
                    maxStarts={5}
                    rating={rating}
                    fullStarColor="#FFD700"
                    emptyStarColor="#d3d3d3"
                  />
                </Row>

                <Text
                  style={{ color: "grey", fontSize: 12 }}
                >{`${distance} km entfernt · ${cuisine} · ${
                  displayNameForPriceCategory[priceClass]
                }`}</Text>
              </View>
            }
            leftElement={
              <CacheImage
                source={{ uri: logo }}
                resizeMode="contain"
                style={{ width: 40, height: 40 }}
              />
            }
          />
        </Card>
      </TouchableOpacity>
    );
  }
}

export default RestaurantCard;

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  starRating: {
    flexDirection: "row",
    alignItems: "center"
  },

  coverPhoto: { height: 200 }
});
