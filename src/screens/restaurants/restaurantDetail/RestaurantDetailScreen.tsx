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

//@ts-ignore
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { Restaurant } from "../../../models/Restaurant";
import Tabs from "../../../components/Tabs";
import Tab from "../../../components/Tab";

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
        backgroundColor="black"
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        renderBackground={() => (
          <Image
            source={{ uri: restaurant.media.coverPhoto }}
            style={{
              height: PARALLAX_HEADER_HEIGHT,
              opacity: 0.5
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
            <Text h3 style={{ color: "#fff" }}>
              {restaurant.description}
            </Text>

            {/* <Button
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
            /> */}
          </View>
        )}
      >
        <Tabs>
          <Tab tabLabel="Infos">
            <RestaurantInfoTab restaurant={restaurant} {...this.props} />
          </Tab>
          <Tab tabLabel="Bewertungen">
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
