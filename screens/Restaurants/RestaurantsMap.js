import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { MapView } from "expo";

class RestaurantsMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Map adresesen api: https://nominatim.openstreetmap.org/search?q=fuerstenstr+14,+ergolding&format=json&polygon=1&addressdetails=1

  render() {
    const { restaurantCoordinates } = this.props;
    return (
      <MapView
        showsUserLocation
        style={styles.map}
        initialRegion={{
          latitude: 48.56859,
          longitude: 12.1665686455389,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: 48.56859,
            longitude: 12.1665686455389
          }}
          title={"home"}
        />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
  mapContainer: {
    height: 200
  }
});

export default RestaurantsMap;
