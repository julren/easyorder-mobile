import React, { Component } from "react";
import { Modal, View } from "react-native";
import RateRestaurantModal from "./RateRestaurantModal";
import firebase, { firebaseReviews } from "../config/firebase";
import { Button, Text } from "react-native-elements";
import StarRating from "react-native-star-rating";

interface IProps {
  restaurantID: string;
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
    this.getReviewForRestaurantByUser(this.props.restaurantID);
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
        <Button
          title="Restaurant bewerten"
          onPress={this.openModal}
          containerStyle={{ margin: 16 }}
        />

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <RateRestaurantModal
            restaurantID={this.props.restaurantID}
            onClose={this.closeModal}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default LeaveReviewButton;
