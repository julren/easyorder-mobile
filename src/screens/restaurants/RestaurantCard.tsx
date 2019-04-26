import React, { Component } from "react";
import { StyleSheet, Image, TouchableOpacity, View } from "react-native";

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
    const coverPhoto = restaurant.media.coverPhoto;

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <TouchableOpacity onPress={onRestaurantSelect}>
            <Card image={{ uri: coverPhoto }} imageStyle={styles.coverPhoto}>
              <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Text h2>{name}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ color: theme.colors.grey3 }}>
                      {rating}.0{" "}
                    </Text>
                    <Icon name="star" color="#F8C533" size={14} />
                  </View>
                </View>

                <View>
                  <Text
                    style={{ color: theme.colors.grey3 }}
                  >{`${distance} km entfernt · ${cuisine} · ${
                    displayNameForPriceCategory[priceClass]
                  }`}</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      </ThemeConsumer>
    );
  }
}

export default RestaurantCard;

const styles = StyleSheet.create({
  cardHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  coverPhoto: { height: 175 }
});
