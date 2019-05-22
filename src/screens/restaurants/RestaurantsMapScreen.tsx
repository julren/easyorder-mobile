import { MapView } from "expo";
import React, { Component } from "react";
import { ListItem } from "react-native-elements";
import { NavigationScreenProps } from "react-navigation";
import withGlobalContext, {
  WithGlobalContextProps
} from "../../contexts/withGlobalContext";
import { Restaurant } from "../../models/Restaurant";

interface IProps extends NavigationScreenProps<any>, WithGlobalContextProps {}

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
    const restaurants: Restaurant[] = this.props.navigation.getParam(
      "restaurants",
      []
    );
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
              latitude: parseFloat(restaurant.address.lat),
              longitude: parseFloat(restaurant.address.lon)
            }}
            title={restaurant.name}
          >
            <MapView.Callout
              onPress={() =>
                this.props.navigation.navigate("RestaurantDetail", {
                  restaurant: restaurant,
                  withMenuLink: true
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
