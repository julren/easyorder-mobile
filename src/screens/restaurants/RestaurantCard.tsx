import geohashDistance from "geohash-distance";
import geohash from "ngeohash";
import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, ListItem, Text } from "react-native-elements";
import StarRating from "react-native-star-rating";
import CacheImage from "../../components/basic/CachedImage";
import Row from "../../components/basic/Row";
import { displayNameForPriceCategory } from "../../config/displayNamesForValues";
import { Restaurant } from "../../models/Restaurant";

interface IProps {
  currentLocationGeoHash: string;
  restaurant: Restaurant;
  onRestaurantSelect: (e) => void;
}

class RestaurantCard extends Component<IProps> {
  render() {
    const {
      restaurant,
      onRestaurantSelect,
      currentLocationGeoHash
    } = this.props;
    const { name, priceClass, cuisine, address, description } = restaurant;
    const { coverPhoto, logo } = restaurant.media;

    const distance = currentLocationGeoHash
      ? geohashDistance.inKm(
          currentLocationGeoHash,
          geohash.encode(address.lat, address.lon, 7)
        )
      : undefined;

    return (
      <TouchableOpacity onPress={onRestaurantSelect}>
        <Card image={{ uri: coverPhoto }} imageStyle={styles.coverPhoto}>
          <ListItem
            bottomDivider={false}
            containerStyle={{ paddingHorizontal: 0, paddingVertical: 0 }}
            title={
              <View>
                <Text h2>{name}</Text>
                <Text style={{ color: "grey", fontSize: 12 }}>
                  {description}
                </Text>
                <Row>
                  {/* <Text style={{ color: "grey", fontSize: 12, marginRight: 4 }}>
                    {restaurant.rating
                      ? restaurant.rating.avgRating.toFixed(1)
                      : 0}
                  </Text> */}
                  <StarRating
                    disabled
                    containerStyle={{ justifyContent: "flex-start" }}
                    starSize={12}
                    maxStarts={5}
                    rating={restaurant.rating ? restaurant.rating.avgRating : 0}
                    fullStarColor="#FFD700"
                    emptyStarColor="#d3d3d3"
                  />
                  <Text style={{ color: "grey", fontSize: 12, marginLeft: 4 }}>
                    ({restaurant.rating ? restaurant.rating.totalNumRatings : 0}
                    )
                  </Text>
                </Row>
                {distance ? (
                  <Text
                    style={{ color: "grey", fontSize: 12 }}
                  >{`${distance.toFixed(1)} km entfernt`}</Text>
                ) : null}
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
