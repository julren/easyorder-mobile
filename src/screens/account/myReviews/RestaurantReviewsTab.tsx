import React from "react";
import { FlatList, View } from "react-native";
import { ListItem, Text } from "react-native-elements";
import StarRating from "react-native-star-rating";
import Container from "../../../components/basic/Container";
import firebase, { firebaseRestaurantReviews } from "../../../config/firebase";
import { RestaurantReview } from "../../../models/RestaurantReview";
import TextNote from "../../../components/basic/TextNote";
export interface Props {}

export interface State {
  reviews: RestaurantReview[];
  loading: boolean;
}

class RestaurantReviewsTab extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { loading: true, reviews: [] };
  }
  componentDidMount() {
    this.getRestaurantReviews();
  }

  getRestaurantReviews = async () => {
    let reviews = [];

    await firebaseRestaurantReviews
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
        console.error("Error getting firebaseRestaurantReviews: ", error);
      });
    this.setState({ reviews: reviews, loading: false });
  };

  render() {
    const { loading, reviews } = this.state;

    return (
      <FlatList
        contentContainerStyle={{ paddingBottom: 32 }}
        ListHeaderComponent={
          <Container padded="more">
            <Text h1>Meine Restaurantbewertungen</Text>
          </Container>
        }
        ListEmptyComponent={
          !loading && (
            <Container padded="more">
              <Text>Keine Restaurantbewertungen bisher</Text>
            </Container>
          )
        }
        data={reviews}
        keyExtractor={item => item.id}
        onRefresh={() => this.getRestaurantReviews()}
        refreshing={this.state.loading}
        renderItem={({ item }) => (
          <ListItem
            leftAvatar={{ source: { uri: item.logo } }}
            title={
              <View>
                <Text>{item.restaurantName}</Text>
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

export default RestaurantReviewsTab;
