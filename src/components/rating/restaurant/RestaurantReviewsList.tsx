import React, { PureComponent } from "react";
import { FlatList, View } from "react-native";
import { ListItem, Text } from "react-native-elements";
import StarRating from "react-native-star-rating";
import { RestaurantReview } from "../../../models";
import LeaveRestaurantReviewButton from "./LeaveRestaurantReviewButton";

interface IProps {
  restaurantReviews: RestaurantReview[];
}

class RestaurantReviewsList extends PureComponent<IProps> {
  render() {
    const { restaurantReviews = [] } = this.props;
    return (
      <FlatList
        scrollEnabled={false}
        data={restaurantReviews}
        keyExtractor={item => item.id}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={RestaurantReviewListItem}
      />
    );
  }
}

export default RestaurantReviewsList;

const ListEmptyComponent = () => (
  <View
    style={{
      alignItems: "center",
      padding: 5
    }}
  >
    <Text style={{ fontSize: 36 }}>⭐️</Text>
    <Text>Keine Restaurantbewertungen bisher.</Text>
  </View>
);

const RestaurantReviewListItem = ({ item }) => (
  <ListItem
    leftIcon={{ name: "person", iconStyle: { color: "grey" } }}
    subtitle={item.text}
    subtitleStyle={{ color: null }}
    titleStyle={{ color: "grey" }}
    title={`Review vom ${item.reviewDate.toDate().toLocaleString([], {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    })}`}
    rightTitle={
      <StarRating
        starSize={15}
        maxStarts={5}
        rating={item.rating}
        fullStarColor="#FFD700"
        emptyStarColor="#d3d3d3"
      />
    }
  />
);
