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
    const { menuItemReviews = [] } = this.props;
    return (
      <FlatList
        data={menuItemReviews}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <View
            style={{
              alignItems: "center",
              padding: 5
            }}
          >
            <Text style={{ fontSize: 36 }}>👻</Text>
            <Text>Keine Bewertungen bisher.</Text>
          </View>
        }
        renderItem={({ item }) => (
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
        )}
      />
    );
  }
}

export default MenuItemReviewsList;
