import React, { Component } from "react";
import { Modal, View, ActivityIndicator, Dimensions } from "react-native";
import firebase, {
  firebaseRestaurants,
  firebaseMenuItemReviews
} from "../../../config/firebase";
import { Button, Text, Overlay } from "react-native-elements";
import StarRating from "react-native-star-rating";
import { RestaurantReview } from "../../../models/RestaurantReview";
import { Restaurant, MenuItem } from "../../../models";
import ReviewMenuItemModal from "./ReviewMenuItemModal";

interface IProps {
  menuItem: MenuItem;
  onChange: () => void;
}

interface IState {
  modalVisible: boolean;
  review: RestaurantReview | undefined;
  loading: boolean;
}

class LeaveMenuItemReviewButton extends Component<IProps, IState> {
  state = {
    modalVisible: false,
    mode: undefined,
    review: undefined,
    menuItem: undefined,
    loading: true
  };

  openModal = () => {
    this.setState({ modalVisible: true });
  };
  closeModal = () => {
    this.props.onChange();
    this.setState({ modalVisible: false });
  };

  componentDidMount() {
    this.getMenuItemReviewOfUser(this.props.menuItem.id);
  }

  getMenuItemReviewOfUser = menuItemId => {
    try {
      this.setState({ loading: true });
      firebaseMenuItemReviews
        .where("userID", "==", firebase.auth().currentUser.uid)
        .where("menuItemID", "==", this.props.menuItem.id)
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
          title={review ? "Bewertung aktualisieren" : "Gericht bewerten"}
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
          <ReviewMenuItemModal
            review={this.state.review}
            menuItem={this.props.menuItem}
            onClose={this.closeModal}
          />
        </Overlay>
      </React.Fragment>
    );
  }
}

export default LeaveMenuItemReviewButton;
