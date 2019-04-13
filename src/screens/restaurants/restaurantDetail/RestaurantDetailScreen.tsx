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
import { Header as NavHeader } from "react-navigation";
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
const STICKY_HEADER_HEIGHT = NavHeader.HEIGHT;
const window = Dimensions.get("window");

class RestaurantDetailScreen extends Component<Props> {
  static navigationOptions = {
    title: null,
    headerTransparent: true,
    headerStyle: { backgroundColor: null }
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
    const restaurant: Restaurant = this.props.navigation.getParam(
      "restaurant",
      {}
    );

    return (
      <ParallaxScrollView
        backgroundColor="#2471A3"
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        backgroundSpeed={0}
        renderBackground={() => (
          <Image
            source={{ uri: restaurant.media.coverPhoto }}
            style={{
              height: PARALLAX_HEADER_HEIGHT,
              imageStyle: { opacity: 20 }
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
        renderStickyHeader={() => (
          <Header
            backgroundColor="#2471A3"
            centerComponent={{
              text: restaurant.name,
              style: { color: "#fff" }
            }}
            rightComponent={
              <Button
                type="clear"
                buttonStyle={{}}
                icon={{
                  name: "restaurant-menu",
                  color: "#fff"
                }}
                containerStyle={{}}
                onPress={() =>
                  this.props.navigation.navigate("Menu", {
                    restaurant: restaurant
                  })
                }
              />
            }
          />
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

export interface Props {
  navigation: any;
  theme: any;
  updateTheme: any;
}
