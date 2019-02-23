import React, { Component } from "react";
import { View, H2, View, Text, Button, Textarea } from "native-base";
import { StarRating } from "react-native-star-rating";
class RateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
        <H2>Bewertung abgeben</H2>
        <Text note>Wie fandest du {restaurant.name}?</Text>

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
          style={{ flex: 1 }}
          rowSpan={5}
          bordered
          placeholder="Deine Meinung..."
        />
        <Separator />

        <Button block>
          <Text>Senden</Text>
        </Button>
      </View>
    );
  }
}

export default RateModal;
