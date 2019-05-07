import React, { Component } from "react";
import { FlatList, View, ActivityIndicator, ScrollView } from "react-native";
import StarRating from "react-native-star-rating";
import { firebaseReviews } from "../../../config/firebase";
import LeaveReviewButton from "../../../components/rating/LeaveReviewButton";
import { RestaurantReview } from "../../../models/Review";
import { Restaurant } from "../../../models/Restaurant";
import { Text, ListItem, Card } from "react-native-elements";
import Separator from "../../../components/basic/Separator";
import ReviewRatingDistributionChart from "../../../components/rating/ReviewRatingDistributionChart";
import ReviewsList from "../../../components/rating/ReviewsList";

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
    this.refreshReviews();
  }

  refreshReviews = () => {
    this.getReviews().then(reviews => {
      this.setState({ reviews: reviews, loading: false });
    });
  };

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
    console.log(restaurant);
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
        <ReviewRatingDistributionChart
          ratingDistribution={restaurant.ratingDistribution}
          totalNumRatings={restaurant.totalNumRatings}
          totalRatingPoints={restaurant.totalRatingPoints}
          avgRating={restaurant.avgRating}
        />

        <Separator borderBottom borderTop heading="Bewertungen" />

        <ReviewsList reviews={this.state.reviews} />

        <LeaveReviewButton
          restaurant={restaurant}
          onChange={this.refreshReviews}
        />
      </ScrollView>
    );
  }
}

export default ReviewsTab;
