import React, { Component } from "react";
import { Modal, View, ActivityIndicator, Dimensions } from "react-native";
import RateRestaurantModal from "./RateRestaurantModal";
import firebase, { firebaseReviews } from "../../config/firebase";
import { Button, Text, Overlay } from "react-native-elements";
import StarRating from "react-native-star-rating";
import { RestaurantReview } from "../../models/Review";
import { Restaurant } from "../../models";

interface IProps {
  restaurant: Restaurant;
  onChange: () => void;
}

interface IState {
  modalVisible: boolean;
  review: RestaurantReview | undefined;
  loading: boolean;
}

class LeaveReviewButton extends Component<IProps, IState> {
  state = { modalVisible: false, review: undefined, loading: true };

  openModal = () => {
    this.setState({ modalVisible: true });
  };
  closeModal = () => {
    this.props.onChange();
    this.setState({ modalVisible: false });
  };

  componentDidMount() {
    this.getReviewForRestaurantByUser(this.props.restaurant.id);
  }

  getReviewForRestaurantByUser = restaurantID => {
    try {
      this.setState({ loading: true });
      firebaseReviews
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
    const { loading, review, modalVisible } = this.state;
    if (loading) return <ActivityIndicator />;

    // if (review) {
    //   return (
    //     <View style={{ margin: 16, alignItems: "flex-start" }}>
    //       <Text>
    //         {`Deine Restaurantbewertung vom ${review.reviewDate
    //           .toDate()
    //           .toLocaleString([], {
    //             day: "2-digit",
    //             month: "2-digit",
    //             year: "numeric"
    //           })}:`}
    //       </Text>

    //       <StarRating
    //         starSize={20}
    //         maxStarts={5}
    //         rating={review.rating}
    //         fullStarColor="#FFD700"
    //         emptyStarColor="#d3d3d3"
    //         starStyle={{ marginRight: 5 }}
    //       />
    //     </View>
    //   );
    // }

    return (
      <React.Fragment>
        <Button
          title={review ? "Bewertung aktualisieren" : "Restaurant bewerten"}
          onPress={this.openModal}
          containerStyle={{ margin: 16 }}
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
          <RateRestaurantModal
            review={this.state.review}
            restaurant={this.props.restaurant}
            onClose={this.closeModal}
          />
        </Overlay>
      </React.Fragment>
    );
  }
}

export default LeaveReviewButton;
