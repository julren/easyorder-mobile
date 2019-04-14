import React, { Component, PureComponent } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  FlatList
} from "react-native";
// import {
//   Container,
//   Content,
//   Text,
//   Button,
//   Card,
//   CardItem,
//   Left,
//   Right,
//   Body,
//   Icon,
//   H3,
//   List,
//   ListItem,
//   Separator,
//   Textarea,
//   View,
//   Tabs,
//   Tab
// } from "native-base";
import { MapView } from "expo";

import { ListItem, Text } from "react-native-elements";

import Separator from "../../../components/Separator";
import { Restaurant } from "../../../models/Restaurant";
import { displayNameForWeekday } from "../../../config/displayNamesForValues";

interface IProps {
  restaurant: Restaurant;
}
interface IState {}

class RestaurantInfoTab extends PureComponent<IProps, IState> {
  render() {
    const {
      restaurant: {
        name,
        priceClass,
        description,
        businessHours,
        contactInfo: { email, phone },
        adress: { city, street, postcode, lat, lon }
      }
    } = this.props;

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);
    return (
      <View>
        <Separator heading="Öffnungszeiten" />

        <FlatList
          data={businessHours}
          keyExtractor={item => item.day}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <ListItem
              bottomDivider
              title={<Text>{displayNameForWeekday[item.day]}</Text>}
              rightElement={
                <Text>
                  {item.openingHour} - {item.closingHour}
                </Text>
              }
            />
          )}
        />

        <Separator heading="Adresse" />

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            scrollEnabled={false}
            zoomEnabled={false}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.005
            }}
          >
            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude
              }}
              title={name}
            />
          </MapView>
        </View>
        <ListItem title={street} subtitle={`${postcode} ${city}`} />

        <Separator heading="Kontakt" />
        <ListItem title={email} leftIcon={{ name: "mail" }} />
        <ListItem title={phone} leftIcon={{ name: "phone" }} />
      </View>
    );
  }
}

//Workaround to get around missing typescript type MapView.Marker
//@ts-ignore
const Marker = props => <MapView.Marker {...props} />;

export default RestaurantInfoTab;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
  mapContainer: {
    height: 150
  }
});
