import React, { Component } from "react";
import Container from "../../components/basic/Container";
import StarRating from "react-native-star-rating";
import { Text, ListItem, Icon, Badge } from "react-native-elements";
import firebase, { firebaseReviews } from "../../config/firebase";
import { RestaurantReview } from "../../models/Review";
import { FlatList, View } from "react-native";

export interface Props {}

export interface State {
  reviews: RestaurantReview[];
  loading: boolean;
}

class MyReviewsScreen extends Component<Props, State> {
  static navigationOptions = {
    title: "Bestellungen"
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      reviews: [],
      loading: true
    };
  }

  componentDidMount() {
    this.getReviews();
  }

  getReviews = async () => {
    let reviews = [];

    await firebaseReviews
      .where("userID", "==", firebase.auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach(reviewDoc => {
            reviews.push({ ...reviewDoc.data(), id: reviewDoc.id });
          });
        }
      })
      .catch(error => {
        console.error("Error getting document: ", error);
      });
    console.log(reviews);
    this.setState({ reviews: reviews, loading: false });
  };

  render() {
    const { reviews } = this.state;
    return (
      <FlatList
        ListHeaderComponent={
          <Container padded="more">
            <Text h1>Meine Bewertungen</Text>
          </Container>
        }
        ListEmptyComponent={
          !this.state.loading && (
            <Container padded="more">
              <Text>Keine Bewertungen bisher</Text>
            </Container>
          )
        }
        data={reviews}
        keyExtractor={item => item.id}
        onRefresh={() => this.getReviews()}
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

export default MyReviewsScreen;

const RatingDisplay = ({ rating }) => (
  <View style={{ flexDirection: "row" }}>
    <Text>{`${rating.toString()} `}</Text>
    <Icon name="star" color="#F8C533" size={14} />
  </View>
);
