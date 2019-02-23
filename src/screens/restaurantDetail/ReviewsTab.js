import React, { Component } from "react";
import { FlatList } from "react-native";
import {
  Button,
  List,
  ListItem,
  Content,
  Textarea,
  Text,
  H3,
  Separator,
  Card,
  Body,
  CardItem,
  H1,
  Right,
  View,
  Icon,
  H2
} from "native-base";
import StarRating from "react-native-star-rating";

class ReviewsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      text: "",
      reviews: [
        {
          reviewID: "435g34623e23",
          rating: 4,
          text:
            "Cooles Restaurant, aber hat auch SChwächen. Getränke kamen spät. Aber dafür war das Essen sehr sehr lecker. Wir werden auf jeden Fall wiederkommen!",
          firstname: "Hans",
          lastname: "Meier",
          date: "2019-04-10"
        },
        {
          reviewID: "fr7832r7f9h",
          rating: 5,
          text: "ecker essen 😄",
          firstname: "Peter",
          lastname: "Beel",
          date: "2019-02-01"
        }
      ]
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      rating: rating
    });
  }

  render() {
    const { restaurant } = this.props;
    restaurant.rating = {
      overall: 4.2,
      numberOfRatings: 18,
      distribution: [
        { starRating: 5, numberOfRatings: 20, percentage: 0.6 },
        { starRating: 4, numberOfRatings: 4, percentage: 0.2 },
        { starRating: 3, numberOfRatings: 1, percentage: 0.1 },
        { starRating: 2, numberOfRatings: 1, percentage: 0.1 },
        { starRating: 1, numberOfRatings: 0, percentage: 0 }
      ]
    };

    return (
      <View
        style={{
          marginTop: 5,
          marginBottom: 15
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            margin: 16
          }}
        >
          <View style={{ flex: 1 }}>
            {restaurant.rating.distribution.map(rating => (
              <View
                key={rating.starRating}
                style={{
                  flexDirection: "row",
                  marginBottom: 4
                }}
              >
                <Text note>{rating.starRating}</Text>

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    marginLeft: 5,
                    borderRadius: 10,
                    backgroundColor: "#f4f4f4"
                  }}
                >
                  <View
                    style={{
                      flex: rating.percentage,
                      borderRadius: 10,
                      backgroundColor: "#FFD700"
                    }}
                  />
                </View>
              </View>
            ))}
          </View>

          <View
            style={{
              marginLeft: "auto",
              justifyContent: "center",
              alignItems: "center",

              padding: 10
            }}
          >
            <Text style={{ fontSize: 30 }}>{restaurant.rating.overall}</Text>

            <StarRating
              starSize={20}
              maxStarts={5}
              rating={4.2}
              fullStarColor="#FFD700"
              emptyStarColor="#d3d3d3"
            />
            <Text note>({restaurant.rating.numberOfRatings})</Text>
          </View>
        </View>

        <Separator bordered>
          <Text>Neuste Bewertungen</Text>
        </Separator>

        <FlatList
          data={this.state.reviews}
          keyExtractor={item => item.reviewID}
          renderItem={({ item }) => (
            <ListItem>
              <Body>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop: 5,
                    paddingBottom: 5
                  }}
                >
                  <Text note>
                    {item.firstname} {item.lastname} am {item.date}
                  </Text>
                  <StarRating
                    starSize={15}
                    maxStarts={5}
                    rating={item.rating}
                    fullStarColor="#FFD700"
                    emptyStarColor="#d3d3d3"
                  />
                </View>
                <Text style={{ marginLeft: 0 }}>{item.text}</Text>
              </Body>
            </ListItem>
          )}
        />
      </View>
    );
  }
}

export default ReviewsTab;
