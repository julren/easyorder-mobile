import React, { Component } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  ImageBackground
} from "react-native";
import {
  Container,
  Content,
  Text,
  Button,
  Card,
  CardItem,
  Left,
  Right,
  Body,
  Icon,
  H3,
  ListItem,
  Separator,
  Textarea,
  View,
  Tabs,
  Tab,
  H1
} from "native-base";

import RestaurantInfoTab from "./RestaurantInfoTab";
import ReviewsTab from "./ReviewsTab";

class RestaurantDetailScreen extends Component {
  static navigationOptions = {
    title: "Restaurant"
  };

  constructor(props) {
    super(props);
  }
  render() {
    const restaurant = this.props.navigation.getParam("restaurant", "{}");

    return (
      <Container>
        {restaurant.media.coverPhoto && (
          <ImageBackground
            source={{ uri: restaurant.media.coverPhoto }}
            style={{
              height: 200,

              imageStyle: { opacity: 20 }
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(60, 109, 130, 0.5)",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <H1 style={{ color: "#fff", fontWeight: "bold" }}>
                {restaurant.name}
              </H1>
              <Text style={{ color: "#fff" }}>{restaurant.description}</Text>
              <Button
                style={{ alignSelf: "center", marginTop: 10 }}
                onPress={() =>
                  this.props.navigation.navigate("Menu", {
                    restaurant: restaurant
                  })
                }
              >
                <Text>Speisekarte</Text>
              </Button>
            </View>
          </ImageBackground>
        )}
        <Tabs tabBarPosition="overlayTop">
          <Tab heading="Infos">
            <Content>
              <ReviewsTab restaurant={restaurant} />
            </Content>
          </Tab>
          <Tab heading="Bewertungen">
            <Content>
              <RestaurantInfoTab restaurant={restaurant} {...this.props} />
            </Content>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default RestaurantDetailScreen;
