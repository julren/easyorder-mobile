import React, { Component } from "react";
import { FlatList, View, ActivityIndicator, ScrollView } from "react-native";
import StarRating from "react-native-star-rating";
import {
  firebaseRestaurants,
  firebaseRestaurantReviews
} from "../../../config/firebase";
import LeaveRestaurantReviewButton from "../../../components/rating/restaurant/LeaveRestaurantReviewButton";
import { RestaurantReview } from "../../../models/RestaurantReview";
import { Restaurant } from "../../../models/Restaurant";
import { Text, ListItem, Card } from "react-native-elements";
import Separator from "../../../components/basic/Separator";
import ReviewRatingDistributionChart from "../../../components/rating/ReviewRatingDistributionChart";
import RestaurantReviewsList from "../../../components/rating/restaurant/RestaurantReviewsList";

interface IProps {
  restaurant: Restaurant;
}
interface IState {
  reviews: RestaurantReview[];
  loading: boolean;
}

class ReviewsTab extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      reviews: []
    };
  }

  componentDidMount() {
    this.getReviews();
  }

  getReviews = async () => {
    return await firebaseRestaurantReviews
      .where("restaurantID", "==", this.props.restaurant.id)
      .orderBy("reviewDate", "desc")
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
        this.setState({ reviews: reviews, loading: false });
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
      <ScrollView
        style={{
          marginTop: 5,
          marginBottom: 15
        }}
      >
        <ReviewRatingDistributionChart rating={restaurant.rating} />

        <Separator borderBottom borderTop heading="Bewertungen" />

        <RestaurantReviewsList restaurantReviews={this.state.reviews} />

        <LeaveRestaurantReviewButton
          restaurant={restaurant}
          onChange={this.getReviews}
        />
      </ScrollView>
    );
  }
}

export default ReviewsTab;
