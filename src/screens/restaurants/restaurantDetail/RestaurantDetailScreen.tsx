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

import { withTheme, Header } from "react-native-elements";
import { Header as NavHeader, NavigationScreenProp } from "react-navigation";
import RestaurantInfoTab from "./RestaurantInfoTab";
import ReviewsTab from "./ReviewsTab";
import { Button } from "react-native-elements";

import { Text } from "react-native-elements";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { Tabs, Tab } from "native-base";

//@ts-ignore
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { Restaurant } from "../../../models/Restaurant";

const PARALLAX_HEADER_HEIGHT = 200;

export interface Props {
  navigation: NavigationScreenProp<any>;
  theme: any;
  updateTheme: any;
}

class RestaurantDetailScreen extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("restaurant").name
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }
  render() {
    const restaurant: Restaurant = this.props.navigation.getParam(
      "restaurant",
      {}
    );

    return (
      <ParallaxScrollView
        backgroundColor="#2471A3"
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        renderBackground={() => (
          <Image
            source={{ uri: restaurant.media.coverPhoto }}
            style={{
              height: PARALLAX_HEADER_HEIGHT
            }}
          />
        )}
        renderForeground={() => (
          <View
            style={{
              flex: 1,
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
        )}
      >
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
      </ParallaxScrollView>
    );
  }
}

export default withTheme(RestaurantDetailScreen);

const styles = StyleSheet.create({
  heroImageText: {
    color: "#fff"
  }
});
