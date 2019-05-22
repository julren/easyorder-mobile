import React, { Component } from "react";
import {
  Modal,
  View,
  ActivityIndicator,
  Dimensions,
  ViewStyle
} from "react-native";
import ReviewRestaurantModal from "./ReviewRestaurantModal";
import firebase, {
  firebaseRestaurants,
  firebaseRestaurantReviews
} from "../../../config/firebase";
import { Button, Text, Overlay } from "react-native-elements";
import StarRating from "react-native-star-rating";
import { RestaurantReview } from "../../../models/RestaurantReview";
import { Restaurant, MenuItem } from "../../../models";

interface IProps {
  restaurant: Restaurant;
  onChange: () => void;
  containerStyle?: ViewStyle;
}

interface IState {
  mode: undefined;
  modalVisible: boolean;
  review: RestaurantReview | undefined;
  loading: boolean;
  alreadyReviewedInSession: boolean;
}

class LeaveRestaurantReviewButton extends Component<IProps, IState> {
  state = {
    modalVisible: false,
    mode: undefined,
    review: undefined,
    menuItem: undefined,
    loading: true,
    alreadyReviewedInSession: false
  };

  openModal = () => {
    this.setState({ modalVisible: true });
  };
  closeModal = () => {
    this.props.onChange();
    this.setState({ modalVisible: false, alreadyReviewedInSession: true });
  };

  componentDidMount() {
    this.getReviewForRestaurantByUser(this.props.restaurant.id);
  }

  getReviewForRestaurantByUser = restaurantID => {
    try {
      this.setState({ loading: true });
      firebaseRestaurantReviews
        .where("userID", "==", firebase.auth().currentUser.uid)
        .where("restaurantID", "==", restaurantID)
        .get()
        .then(querySnapshot => {
          let reviews = [];

          querySnapshot.forEach(doc => {
            reviews.push({ id: doc.id, ...doc.data() });
          });

          if (reviews.length > 0) {
            this.setState({ review: reviews[0] });
          }
          this.setState({ loading: false });
        })
        .catch(error => {
          console.error("Error getting document..: ", error);
        });
    } catch (error) {
      this.setState({ loading: false });

      console.log(error);
    }
  };

  render() {
    const {
      loading,
      review,
      modalVisible,
      alreadyReviewedInSession
    } = this.state;
    if (alreadyReviewedInSession) return <React.Fragment />;

    if (loading) return <ActivityIndicator />;

    return (
      <View style={{ ...this.props.containerStyle }}>
        <Button
          title={review ? "Bewertung aktualisieren" : "Restaurant bewerten"}
          onPress={this.openModal}
          containerStyle={{ marginHorizontal: 16, marginBottom: 16 }}
        />
        <Overlay
          onBackdropPress={this.closeModal}
          isVisible={modalVisible}
          windowBackgroundColor="rgba(0, 0, 0, 0.7)"
          overlayBackgroundColor="#fff"
          height="auto"
          overlayStyle={{ padding: 20 }}
          borderRadius={20}
          width={Dimensions.get("window").width - 40}
        >
          <ReviewRestaurantModal
            review={this.state.review}
            restaurant={this.props.restaurant}
            onClose={this.closeModal}
          />
        </Overlay>
      </View>
    );
  }
}

export default LeaveRestaurantReviewButton;
