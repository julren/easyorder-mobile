import React, { Component } from "react";
import Container from "../../components/Container";
import { Text, ListItem, Icon } from "react-native-elements";
import firebase, { firebaseReviews } from "../../config/firebase";
import { Review } from "../../models/Review";
import { FlatList, View } from "react-native";

export interface Props {}

export interface State {
  reviews: Review[];
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

  getReviews = () => {
    try {
      firebaseReviews
        .where("userID", "==", firebase.auth().currentUser.uid)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            let reviews = [];

            querySnapshot.forEach(reviewDoc => {
              reviews.push({ ...reviewDoc.data(), id: reviewDoc.id });
            });

            this.setState({ reviews: reviews, loading: false });
          }
        })
        .catch(error => {
          console.error("Error getting document: ", error);
        });
    } catch (error) {}
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
        data={reviews}
        keyExtractor={item => item.id}
        onRefresh={() => this.getReviews()}
        refreshing={this.state.loading}
        renderItem={({ item }) => (
          <ListItem
            title={item.restaurantID}
            subtitle={item.reviewDate.toDate().toLocaleString([], {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })}
            rightTitle={<RatingDisplay rating={item.rating} />}
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
