import React, { Component } from "react";
import { Restaurant } from "../../models/Restaurant";
import { MapView } from "expo";
import { NavigationScreenProp } from "react-navigation";
import { View } from "react-native";
import { Text, ListItem } from "react-native-elements";
import withGlobalContext from "../../contexts/withGlobalContext";
import { GlobalContext } from "../../contexts/GlobalContext";

export interface IProps {
  navigation: NavigationScreenProp<any, any>;
  globalContext: GlobalContext;
}

export interface IState {}

class RestaurantsMapScreen extends Component<IProps, IState> {
  static navigationOptions = {
    title: "Restaurants in der Nähe"
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const restaurants: Restaurant[] = this.props.globalContext.restaurants;
    const location = this.props.navigation.getParam("location", {});

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

export default withGlobalContext(RestaurantsMapScreen);
