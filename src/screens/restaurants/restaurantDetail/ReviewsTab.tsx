import React, { Component } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import StarRating from "react-native-star-rating";
import { firebaseReviews } from "../../../config/firebase";
import LeaveReviewButton from "../../../components/LeaveReviewButton";
import { Review } from "../../../models/Review";
import { Restaurant } from "../../../models/Restaurant";
import { Text, ListItem, Card } from "react-native-elements";
import Separator from "../../../components/Separator";

interface IProps {
  restaurant: Restaurant;
}
interface IState {
  reviews: Review[];
  loading: boolean;
}

class ReviewsTab extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      reviews: [
        {
          id: "435g34623e23",
          restaurantID: "",
          userID: "",
          rating: 4,
          text:
            "Cooles Restaurant, aber hat auch SChwächen. Getränke kamen spät. Aber dafür war das Essen sehr sehr lecker. Wir werden auf jeden Fall wiederkommen!",
          firstname: "Hans",
          lastname: "Meier",
          reviewDate: "2019-04-10"
        },
        {
          id: "fr7832r7f9h",
          restaurantID: "",
          userID: "",
          rating: 5,
          text: "ecker essen 😄",
          firstname: "Peter",
          lastname: "Beel",
          reviewDate: "2019-02-01"
        }
      ]
    };
  }

  componentDidMount() {
    console.log(this.props.restaurant);
    this.getReviews().then(reviews => {
      this.setState({ reviews: reviews, loading: false });
    });
  }

  getReviews = async () => {
    return await firebaseReviews
      .where("restaurantID", "==", this.props.restaurant.id)
      .get()
      .then(querySnapshot => {
        let reviews = [];
        if (querySnapshot.empty) {
          console.log("No reviews for restaurantID ", this.props.restaurant.id);
        } else {
          querySnapshot.forEach(doc => {
            reviews.push({ id: doc.id, ...doc.data() });
          });
        }
        return reviews;
      });
  };

  render() {
    const { restaurant } = this.props;
    const { reviews, loading } = this.state;
    // restaurant.rating = {
    //   overall: 4.2,
    //   numberOfRatings: 18,
    //   distribution: [
    //     { starRating: 5, numberOfRatings: 20, percentage: 0.6 },
    //     { starRating: 4, numberOfRatings: 4, percentage: 0.2 },
    //     { starRating: 3, numberOfRatings: 1, percentage: 0.1 },
    //     { starRating: 2, numberOfRatings: 1, percentage: 0.1 },
    //     { starRating: 1, numberOfRatings: 0, percentage: 0 }
    //   ]
    // };

    if (loading) return <ActivityIndicator />;

    return (
      <View
        style={{
          marginTop: 5,
          marginBottom: 15
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            margin: 16
          }}
        >
          <View style={{ flex: 1 }}>
            {Object.keys(restaurant.ratingDistribution).map((key, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  marginBottom: 4
                }}
              >
                <Text>{key}</Text>

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    marginLeft: 5,
                    borderRadius: 10,
                    backgroundColor: "#f4f4f4"
                  }}
                >
                  <View
                    style={{
                      flex:
                        restaurant.ratingDistribution[key] /
                        restaurant.totalRatingPoints,
                      borderRadius: 10,
                      backgroundColor: "#FFD700"
                    }}
                  />
                </View>
              </View>
            ))}
          </View>

          <View
            style={{
              marginLeft: "auto",
              justifyContent: "center",
              alignItems: "center",

              padding: 10
            }}
          >
            <Text style={{ fontSize: 30 }}>{restaurant.avgRating}</Text>

            <StarRating
              starSize={20}
              maxStarts={5}
              rating={restaurant.avgRating}
              fullStarColor="#FFD700"
              emptyStarColor="#d3d3d3"
            />
            <Text>({restaurant.totalNumRatings})</Text>
          </View>
        </View>
        <Separator />

        <Separator border={true} heading="Bewertungen" />

        <FlatList
          data={this.state.reviews}
          keyExtractor={item => item.id}
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

        <LeaveReviewButton restaurantID={restaurant.id} />
      </View>
    );
  }
}

export default ReviewsTab;
