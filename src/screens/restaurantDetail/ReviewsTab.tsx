import React, { Component } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import Separator from "../../components/basic/Separator";
import LeaveRestaurantReviewButton from "../../components/rating/restaurant/LeaveRestaurantReviewButton";
import RestaurantReviewsList from "../../components/rating/restaurant/RestaurantReviewsList";
import ReviewRatingDistributionChart from "../../components/rating/ReviewRatingDistributionChart";
import { firebaseRestaurantReviews } from "../../config/firebase";
import { Restaurant } from "../../models/Restaurant";
import { RestaurantReview } from "../../models/RestaurantReview";

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

    if (loading) return <ActivityIndicator />;

    return (
      <View>
        <ReviewRatingDistributionChart rating={restaurant.rating} />
        <LeaveRestaurantReviewButton
          restaurant={restaurant}
          onChange={this.getReviews}
        />
        <Separator borderBottom borderTop heading="Bewertungen" />
        <RestaurantReviewsList restaurantReviews={this.state.reviews} />
      </View>
    );
  }
}

export default ReviewsTab;
