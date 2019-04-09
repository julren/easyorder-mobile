import React, { Component } from "react";
import { View, H2, Text, Button, Textarea, Separator } from "native-base";
import StarRating from "react-native-star-rating";
import {
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import firebase, { firebaseReviews } from "../config/firebase";

interface IProps {
  restaurantID: string;
  onClose: () => void;
}

class RateRestaurantModal extends Component<IProps> {
  state = {
    rating: 0,
    text: ""
  };

  onStarRatingPress = (rating: number) => {
    this.setState({ rating: rating });
  };

  onSubmit = () => {
    const review: Review = {
      userID: firebase.auth().currentUser.uid,
      restaurantID: this.props.restaurantID,
      rating: this.state.rating,
      text: this.state.text,
      firstname: "",
      lastname: "",
      reviewDate: firebase.firestore.Timestamp.now()
    };

    firebaseReviews
      .add(review)
      .then(() => {
        this.props.onClose();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { restaurantID, onClose } = this.props;
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
          padding: 16,
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "rgba(52, 52, 52, 0.8)"
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Button transparent onPress={onClose}>
            <Text>X</Text>
          </Button>
        </View>

        <View
          style={{
            backgroundColor: "#ffff",
            padding: 16
          }}
        >
          <H2>Bewertung abgeben</H2>
          <Text note>Wie fandest du das Restaurant?</Text>

          <View style={{ padding: 10, alignItems: "flex-start" }}>
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
          <Textarea
            style={{ flexGrow: 1, marginBottom: 16 }}
            value={this.state.text}
            onChangeText={text => this.setState({ text: text })}
            rowSpan={5}
            bordered
            placeholder="Deine Meinung..."
          />

          <Button
            block
            disabled={this.state.rating ? false : true}
            onPress={this.onSubmit}
          >
            <Text>Senden</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default RateRestaurantModal;
