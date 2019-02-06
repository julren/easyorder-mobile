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

class RestaurantDetailScreen extends Component {
  static navigationOptions = {
    title: "Restaurant"
  };

  constructor(props) {
    super(props);
  }
  render() {
    const restaurant = this.props.navigation.getParam("restaurant", "{}");

    const {
      name,
      priceClass,
      description,
      cuisine,
      businessHours
    } = restaurant;
    const { email, phone } = restaurant.contactInfo;
    const { city, street, postcode } = restaurant.adress;
    const lat = parseFloat(restaurant.adress.lat);
    const lon = parseFloat(restaurant.adress.lon);

    return (
      <Container>
        <Content>
          {restaurant.media.coverPhoto && (
            <Image
              source={{ uri: restaurant.media.coverPhoto }}
              style={{ height: 150 }}
            />
          )}

          <Tabs tabBarPosition="overlayTop">
            <Tab heading="Infos">
              <ListItem>
                <View>
                  <H3 style={{ fontWeight: "bold" }}>{name}</H3>
                  <Text>{description}</Text>
                  <Text style={{ fontSize: 12 }}>
                    {displayNameForPriceClass(priceClass)}
                  </Text>
                </View>
              </ListItem>

              <ListItem>
                <Body>
                  <Button
                    block
                    onPress={() =>
                      this.props.navigation.navigate("Menu", {
                        restaurant: restaurant
                      })
                    }
                  >
                    <Text>Speisekarte</Text>
                  </Button>
                </Body>
              </ListItem>

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

              <Separator bordered>
                <Text>Adresse</Text>
              </Separator>

              <View style={styles.mapContainer}>
                <MapView
                  style={styles.map}
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

              <Separator bordered>
                <Text>Kontakt</Text>
              </Separator>
              <ListItem>
                <Text>{email}</Text>
              </ListItem>
              <ListItem>
                <Text>{phone}</Text>
              </ListItem>
              <Separator bordered />
            </Tab>
            <Tab heading="Bewertungen">
              <ListItem>
                <Text>Bewertungen</Text>
              </ListItem>
            </Tab>
          </Tabs>
        </Content>
      </Container>
    );
  }
}

export default RestaurantDetailScreen;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
  mapContainer: {
    height: 150
  }
});
