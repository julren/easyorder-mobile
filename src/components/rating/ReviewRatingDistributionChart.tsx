import React, { PureComponent } from "react";
import { View } from "react-native";
import StarRating from "react-native-star-rating";
import { Text } from "react-native-elements";

interface IProps {
  rating: any;
}

class ReviewRatingDistributionChart extends PureComponent<IProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { rating = fallbackRating } = this.props;

    const {
      ratingDistribution = {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      totalNumRatings = 0,
      totalRatingPoints = 0,
      avgRating = 0.0
    } = rating;

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          margin: 16
        }}
      >
        <View style={{ flex: 1 }}>
          {Object.keys(ratingDistribution)
            .sort((a: any, b: any) => b - a)
            .map((key, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    marginBottom: 4
                  }}
                >
                  <Text>{key}</Text>

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
                        flex:
                          totalRatingPoints > 0
                            ? (ratingDistribution[key] * parseInt(key)) /
                              totalRatingPoints
                            : 0,
                        borderRadius: 10,
                        backgroundColor: "#FFD700"
                      }}
                    />
                  </View>
                </View>
              );
            })}
        </View>

        <View
          style={{
            marginLeft: "auto",
            justifyContent: "center",
            alignItems: "center",
            padding: 10
          }}
        >
          <Text style={{ fontSize: 30 }}>{avgRating.toFixed(1)}</Text>

          <StarRating
            starSize={20}
            maxStarts={5}
            rating={avgRating}
            fullStarColor="#FFD700"
            emptyStarColor="#d3d3d3"
          />
          <Text>({totalNumRatings})</Text>
        </View>
      </View>
    );
  }
}

export default ReviewRatingDistributionChart;

const fallbackRating = {
  ratingDistribution: {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0
  },
  totalNumRatings: 0,
  totalRatingPoints: 0,
  avgRating: 0.0
};
