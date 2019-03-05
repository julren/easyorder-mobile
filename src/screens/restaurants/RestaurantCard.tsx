import React from "react";
// import { Card, CardItem, Text, Body, Right, H3 } from "native-base";
import StarRating from "react-native-star-rating";
import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import { displayNameForPriceClass } from "../../utils/dataPipes";
import { withTheme } from "react-native-elements";

import Restaurant from "./Restaurant";

import {
  Card,
  ListItem,
  Button,
  Icon,
  Text,
  Rating
} from "react-native-elements";

class RestaurantCard extends React.Component<IProps, IState> {
  render() {
    // TODO: distance, rating
    const { theme } = this.props;

    const distance = 1.2;
    const rating = 4;
    const { restaurant, onRestaurantSelect } = this.props;
    const { name, priceClass, cuisine } = restaurant;
    const coverPhoto = restaurant.media.coverPhoto;

    return (
      <TouchableOpacity onPress={onRestaurantSelect}>
        <Card image={{ uri: coverPhoto }}>
          <Text h3>{name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Rating imageSize={12} readonly startingValue={rating} />
            <Text style={{ color: theme.colors.grey3 }}> ({rating})</Text>
          </View>

          <Text
            style={{ color: theme.colors.grey3 }}
          >{`${distance} km entfernt | ${cuisine} | ${displayNameForPriceClass(
            priceClass
          )}`}</Text>

          {/* <ListItem
            containerStyle={{ paddingHorizontal: 0, paddingVertical: 8 }}
            titleStyle={{ fontWeight: "bold" }}
            title={name}
            subtitle={`${distance} km entfernt | ${cuisine} | ${displayNameForPriceClass(
              priceClass
            )}`}
            rightElement={
              <Rating
                imageSize={14}
                readonly
                startingValue={rating}
                style={{ alignSelf: "flex-start" }}
              />
            }
            bottomDivider={false}
          /> */}
        </Card>
      </TouchableOpacity>

      // <Card>
      //   <CardItem cardBody button onPress={onRestaurantSelect}>
      //     <Image source={{ uri: coverPhoto }} style={styles.coverPhoto} />
      //   </CardItem>

      //   <CardItem>
      //     <Body>
      //       <H3>{name}</H3>
      //     </Body>
      //     <Right>
      //       <StarRating
      //         starSize={14}
      //         maxStarts={5}
      //         halfStarEnabled={true}
      //         rating={rating}
      //         fullStarColor="#FFD700"
      //         emptyStarColor="#d3d3d3"
      //       />
      //     </Right>
      //   </CardItem>

      //   <CardItem>
      //     <Body>
      //       <Text note>Geöffnet bis 19:00 Uhr</Text>
      //       <Text note>
      //         {distance}km entfernt | {cuisine} |
      //         {displayNameForPriceClass(priceClass)}
      //       </Text>
      //     </Body>
      //   </CardItem>
      // </Card>
    );
  }
}

export default withTheme(RestaurantCard);
const styles = StyleSheet.create({
  cardHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  coverPhoto: { height: 150, width: null, flex: 1 }
});

interface IProps {
  theme: any;
  restaurant: Restaurant;
  onRestaurantSelect: (e) => void;
}
interface IState {
  restaurants: any[];
}
