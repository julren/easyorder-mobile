import React, { Component } from "react";
import { Restaurant } from "../../models/Restaurant";
import { MapView } from "expo";
import { NavigationScreenProp } from "react-navigation";
import { View } from "react-native";
import { Text, ListItem } from "react-native-elements";

export interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export interface State {}

class RestaurantsMapScreen extends Component<Props, State> {
  static navigationOptions = {
    title: "Restaurants in der Nähe"
  };

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const restaurants: Restaurant[] = this.props.navigation.getParam(
      "restaurants",
      []
    );
    const location = this.props.navigation.getParam("location", {});

    console.log(restaurants, location);
    // @ts-ignore-start
    return (
      <MapView
        provider={"google"}
        style={{ flex: 1 }}
        showsUserLocation={true}
        initialRegion={{
          latitude: parseFloat(location.lat),
          longitude: parseFloat(location.lon),
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}
      >
        {restaurants.map(restaurant => (
          // @ts-ignore
          <MapView.Marker
            key={restaurant.id}
            coordinate={{
              latitude: parseFloat(restaurant.adress.lat),
              longitude: parseFloat(restaurant.adress.lon)
            }}
            title={restaurant.name}
          >
            <MapView.Callout
              onPress={() =>
                this.props.navigation.navigate("RestaurantDetail", {
                  restaurant: restaurant
                })
              }
            >
              <ListItem
                leftAvatar={{
                  rounded: false,
                  source: { uri: restaurant.media.logo, cache: "force-cache" }
                }}
                rightIcon={{ name: "info" }}
                title={restaurant.name}
                subtitle={restaurant.description}
                bottomDivider={false}
              />
            </MapView.Callout>
          </MapView.Marker>
        ))}
      </MapView>
    );
  }
}

export default RestaurantsMapScreen;
