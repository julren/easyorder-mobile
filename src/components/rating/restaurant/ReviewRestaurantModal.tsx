import React, { Component } from "react";
import StarRating from "react-native-star-rating";
import {
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage,
  View
} from "react-native";
import firebase, { firebaseRestaurantReviews } from "../../../config/firebase";
import { Text, Button, Icon, Input } from "react-native-elements";
import TextNote from "../../basic/TextNote";
import { RestaurantReview } from "../../../models/RestaurantReview";
import { Restaurant } from "../../../models";

interface IProps {
  review: RestaurantReview | undefined;
  restaurant: Restaurant;
  onClose: () => void;
}

class ReviewRestaurantModal extends Component<IProps> {
  state = {
    rating: 0,
    text: ""
  };

  componentDidMount() {
    if (this.props.review) {
      this.setState({
        rating: this.props.review.rating,
        text: this.props.review.text
      });
    }
  }

  onStarRatingPress = (rating: number) => {
    this.setState({ rating: rating });
  };

  onSubmit = () => {
    const review: RestaurantReview = {
      userID: firebase.auth().currentUser.uid,
      restaurantID: this.props.restaurant.id,
      restaurantName: this.props.restaurant.name,
      logo: this.props.restaurant.media.logo,
      rating: this.state.rating,
      text: this.state.text,
      reviewDate: firebase.firestore.Timestamp.now()
    };

    this.props.review ? this.updateReview(review) : this.createReview(review);
  };

  createReview = review => {
    firebaseRestaurantReviews
      .add(review)
      .then(() => {
        this.props.onClose();
      })
      .catch(error => {
        console.log(error);
      });
  };

  updateReview = review => {
    firebaseRestaurantReviews
      .doc(this.props.review.id)
      .update(review)
      .then(() => {
        this.props.onClose();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { rating } = this.state;
    const { restaurant, onClose, review } = this.props;
    return (
      <KeyboardAvoidingView
        behavior="padding"
        contentContainerStyle={{ padding: 16 }}
      >
        <View style={{ alignItems: "center" }}>
          <Icon
            name="thumb-up"
            iconStyle={{ fontSize: 50, color: "#008ACD" }}
          />

          <Text h1>
            {review ? "Bewertung aktualisieren" : "Bewertung abgeben"}
          </Text>
          <TextNote>
            {review
              ? ` Deine Bewertung vom ${review.reviewDate
                  .toDate()
                  .toLocaleString([], {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                  })}`
              : "Wie gefällt dir das Restaurant?"}
          </TextNote>

          <View style={{ paddingVertical: 15, alignItems: "flex-start" }}>
            <StarRating
              starSize={40}
              maxStarts={5}
              rating={this.state.rating}
              fullStarColor="#FFD700"
              emptyStarColor="#d3d3d3"
              starStyle={{ marginRight: 5 }}
              selectedStar={rating => this.onStarRatingPress(rating)}
            />
          </View>
        </View>

        <Input
          style={{ flexGrow: 1, marginBottom: 16 }}
          value={this.state.text}
          onChangeText={text => this.setState({ text: text })}
          numberOfLines={5}
          placeholder="Deine Meinung..."
        />

        <Button
          title={review ? "Bewertung aktualisieren" : "Senden"}
          disabled={rating ? false : true}
          onPress={this.onSubmit}
          style={{ marginTop: 16 }}
        />
      </KeyboardAvoidingView>
    );
  }
}

export default ReviewRestaurantModal;
