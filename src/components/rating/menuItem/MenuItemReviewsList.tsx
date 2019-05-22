import React, { PureComponent } from "react";
import { FlatList, View } from "react-native";
import { ListItem, Text } from "react-native-elements";
import StarRating from "react-native-star-rating";
import { MenuItemReview } from "../../../models/MenuItemReview";

interface IProps {
  menuItemReviews: MenuItemReview[];
}

class MenuItemReviewsList extends PureComponent<IProps> {
  render() {
    const { menuItemReviews = [], ...rest } = this.props;
    return (
      <FlatList
        {...rest}
        data={menuItemReviews}
        keyExtractor={item => item.id}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={MenuItemReviewListItem}
      />
    );
  }
}

export default MenuItemReviewsList;

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

const MenuItemReviewListItem = ({ item }) => (
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
