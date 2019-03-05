import React, { Component } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  ImageBackground,
  View,
  Dimensions
} from "react-native";

import { withTheme } from "react-native-elements";

import RestaurantInfoTab from "./RestaurantInfoTab";
import ReviewsTab from "./ReviewsTab";
import { Button } from "react-native-elements";

import { Text } from "react-native-elements";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { Tabs, Tab } from "native-base";

const TestTab = () => <Text>iosjiosda</Text>;

class RestaurantDetailScreen extends Component<Props> {
  static navigationOptions = {
    title: "Restaurant"
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "info", title: "Infos" },
        { key: "reviews", title: "Bewertungen" }
      ]
    };
  }
  render() {
    const restaurant: any = this.props.navigation.getParam("restaurant", {});

    return (
      <View style={{ flex: 1 }}>
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
                backgroundColor: "rgba(70, 70, 70, 0.6)",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text h1 style={{ color: "#fff", fontWeight: "bold" }}>
                {restaurant.name}
              </Text>
              <Text style={{ color: "#fff" }}> {restaurant.description}</Text>

              <Button
                buttonStyle={{ padding: 10 }}
                icon={{
                  name: "restaurant-menu",
                  color: "#fff"
                }}
                title="Speisekarte"
                containerStyle={{ marginTop: 20 }}
                onPress={() =>
                  this.props.navigation.navigate("Menu", {
                    restaurant: restaurant
                  })
                }
              />
            </View>
          </ImageBackground>
        )}

        <Tabs
          tabBarPosition="top"
          tabBarUnderlineStyle={{
            backgroundColor: this.props.theme.colors.primary
          }}
        >
          <Tab
            heading="Infos"
            activeTextStyle={{ color: this.props.theme.colors.primary }}
          >
            <RestaurantInfoTab restaurant={restaurant} {...this.props} />
          </Tab>

          <Tab
            heading="Bewertungen"
            activeTextStyle={{ color: this.props.theme.colors.primary }}
          >
            <ReviewsTab restaurant={restaurant} />
          </Tab>
        </Tabs>
      </View>
    );
  }
}

export default withTheme(RestaurantDetailScreen);

const styles = StyleSheet.create({
  heroImageText: {
    color: "#fff"
  }
});

export interface Props {
  navigation: any;
  theme: any;
  updateTheme: any;
}
