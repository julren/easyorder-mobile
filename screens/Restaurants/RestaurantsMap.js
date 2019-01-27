import React, { Component } from "react";
import { MapView } from "expo";

class RestaurantsMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Map adresesen api: https://nominatim.openstreetmap.org/search?q=fuerstenstr+14,+ergolding&format=json&polygon=1&addressdetails=1

  render() {
    return (
      <MapView
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

export default RestaurantsMap;
