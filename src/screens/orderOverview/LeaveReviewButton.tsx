import React, { Component } from "react";
import { Modal } from "react-native";
import RateRestaurantModal from "./RateRestaurantModal";
import firebase, { firebaseReviews } from "../../config/firebase";
import { Button, Text, View } from "native-base";
import StarRating from "react-native-star-rating";

interface IProps {
  restaurant: any;
}

class LeaveReviewButton extends Component<IProps> {
  state = { modalVisible: false, review: undefined, loading: true };

  openModal = () => {
    this.setState({ modalVisible: true });
  };
  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  getReviewForRestaurantByUser = restaurantID => {
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
  };

  componentDidMount() {
    this.getReviewForRestaurantByUser(this.props.restaurant.restaurantID);
  }

  render() {
    if (this.state.loading) return <React.Fragment />;

    if (this.state.review) {
      return (
        <View style={{ margin: 16, alignItems: "flex-start" }}>
          <Text>
            {`Deine Restaurantbewertung vom ${this.state.review.reviewDate
              .toDate()
              .toLocaleString([], {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
              })}:`}
          </Text>

          <StarRating
            starSize={20}
            maxStarts={5}
            rating={this.state.review.rating}
            fullStarColor="#FFD700"
            emptyStarColor="#d3d3d3"
            starStyle={{ marginRight: 5 }}
          />
        </View>
      );
    }

    return (
      <React.Fragment>
        <Button block onPress={this.openModal} style={{ margin: 16 }}>
          <Text>Restaurant bewerten</Text>
        </Button>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <RateRestaurantModal
            restaurant={this.props.restaurant}
            onClose={this.closeModal}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default LeaveReviewButton;
