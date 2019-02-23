import React, { Component } from "react";
import { Image, Platform, ScrollView, StyleSheet } from "react-native";
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
  List,
  ListItem,
  Separator,
  Textarea,
  View,
  Tabs,
  Tab
} from "native-base";
import { MapView } from "expo";

import {
  displayNameForWeekday,
  displayNameForPriceClass
} from "../../utils/dataPipes";

class RestaurantInfoTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { restaurant } = this.props;

    const { name, priceClass, description, businessHours } = restaurant;
    const { email, phone } = restaurant.contactInfo;
    const { city, street, postcode } = restaurant.adress;
    const lat = parseFloat(restaurant.adress.lat);
    const lon = parseFloat(restaurant.adress.lon);

    return (
      <List>
        <Separator bordered>
          <Text>Öffnungszeiten</Text>
        </Separator>
        {businessHours.map((item, index) => {
          const { day, openingHour, closingHour } = item;

          return (
            <ListItem key={index}>
              <Text>{displayNameForWeekday(day)}: </Text>
              <Text>{openingHour} - </Text>
              <Text>{closingHour}</Text>
            </ListItem>
          );
        })}
        <Separator>
          <Text>Adresse</Text>
        </Separator>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            scrollEnabled={false}
            zoomEnabled={false}
            initialRegion={{
              latitude: lat,
              longitude: lon,
              latitudeDelta: 0.01,
              longitudeDelta: 0.005
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: lat,
                longitude: lon
              }}
              title={name}
            />
          </MapView>
        </View>
        <ListItem>
          <View>
            <Text>{street}</Text>
            <Text>
              {postcode} {city}
            </Text>
          </View>
        </ListItem>
        <Separator>
          <Text>Kontakt</Text>
        </Separator>
        <ListItem>
          <Text>{email}</Text>
        </ListItem>
        <ListItem>
          <Text>{phone}</Text>
        </ListItem>
        <Separator />
      </List>
    );
  }
}

export default RestaurantInfoTab;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
  mapContainer: {
    height: 150
  }
});
