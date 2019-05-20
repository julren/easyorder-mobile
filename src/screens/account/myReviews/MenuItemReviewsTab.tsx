import React, { Component } from "react";
import Container from "../../../components/basic/Container";
import StarRating from "react-native-star-rating";
import { Text, ListItem, Icon, Badge } from "react-native-elements";
import firebase, {
  firebaseMenuItemReviews,
  firebaseRestaurantReviews
} from "../../../config/firebase";
import { RestaurantReview } from "../../../models/RestaurantReview";
import { FlatList, View } from "react-native";
import { MenuItemReview } from "../../../models/MenuItemReview";
import { TextNote } from "../../../components";
export interface Props {}

export interface State {
  reviews: MenuItemReview[];
  loading: boolean;
}

class MenuItemReviewsTab extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { loading: true, reviews: [] };
  }
  componentDidMount() {
    this.getMenuItemReviews();
  }

  getMenuItemReviews = async () => {
    let reviews = [];

    await firebaseMenuItemReviews
      .where("userID", "==", firebase.auth().currentUser.uid)
      .orderBy("reviewDate", "desc")
      .get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach(reviewDoc => {
            reviews.push({ ...reviewDoc.data(), id: reviewDoc.id });
          });
        }
      })
      .catch(error => {
        console.error("Error getting firebaseMenuItemReviews: ", error);
      });
    this.setState({ reviews: reviews, loading: false });
  };

  render() {
    const { loading, reviews } = this.state;

    return (
      <FlatList
        ListHeaderComponent={
          <Container padded="more">
            <Text h1>Meine Gerichtbewertungen</Text>
          </Container>
        }
        ListEmptyComponent={
          !loading && (
            <Container padded="more">
              <Text>Keine Gerichtbewertungen bisher</Text>
            </Container>
          )
        }
        data={reviews}
        keyExtractor={item => item.id}
        onRefresh={() => this.getMenuItemReviews()}
        refreshing={this.state.loading}
        renderItem={({ item }) => (
          <ListItem
            leftAvatar={{ source: { uri: item.photo } }}
            title={
              <View style={{ flexDirection: "row" }}>
                <Text>{item.menuItemName}</Text>
                <TextNote style={{ marginLeft: 4 }}>
                  ({item.restaurantName})
                </TextNote>
              </View>
            }
            subtitle={
              <View>
                <TextNote>{item.text}</TextNote>
                <StarRating
                  disabled
                  starSize={14}
                  maxStarts={5}
                  rating={item.rating}
                  fullStarColor="#FFD700"
                  emptyStarColor="#d3d3d3"
                  containerStyle={{ justifyContent: "flex-start" }}
                />
              </View>
            }
            rightElement={
              <Text style={{ color: "grey", fontSize: 12 }}>
                {item.reviewDate.toDate().toLocaleString([], {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric"
                })}
              </Text>
            }
          />
        )}
      />
    );
  }
}

export default MenuItemReviewsTab;
