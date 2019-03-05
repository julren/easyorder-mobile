import React, { Component } from "react";
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

import {
  displayNameForWeekday,
  displayNameForPriceClass
} from "../../utils/dataPipes";
import Separator from "../../components/Separator";

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
      <ScrollView>
        <Separator heading="Öffnungszeiten" />

        <FlatList
          data={businessHours}
          keyExtractor={item => item.day}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <ListItem
              bottomDivider
              title={<Text>{displayNameForWeekday(item.day)}</Text>}
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
        <ListItem title={street} subtitle={`${postcode} ${city}`} />

        <Separator heading="Kontakt" />
        <ListItem title={email} leftIcon={{ name: "mail" }} />
        <ListItem title={phone} leftIcon={{ name: "phone" }} />
      </ScrollView>

      // <List>
      //   <Separator bordered>
      //     <Text>Öffnungszeiten</Text>
      //   </Separator>
      //   {businessHours.map((item, index) => {
      //     const { day, openingHour, closingHour } = item;

      //     return (
      //       <ListItem noIndent key={index}>
      //         <View
      //           style={{
      //             flexDirection: "row",
      //             flex: 1,
      //             justifyContent: "space-between"
      //           }}
      //         >
      //           <Text>{displayNameForWeekday(day)}: </Text>
      //           <Text>
      //             {openingHour} - {closingHour}
      //           </Text>
      //         </View>
      //       </ListItem>
      //     );
      //   })}
      //   <Separator>
      //     <Text>Adresse</Text>
      //   </Separator>
      //   <View style={styles.mapContainer}>
      //     <MapView
      //       style={styles.map}
      //       scrollEnabled={false}
      //       zoomEnabled={false}
      //       initialRegion={{
      //         latitude: lat,
      //         longitude: lon,
      //         latitudeDelta: 0.01,
      //         longitudeDelta: 0.005
      //       }}
      //     >
      //       <MapView.Marker
      //         coordinate={{
      //           latitude: lat,
      //           longitude: lon
      //         }}
      //         title={name}
      //       />
      //     </MapView>
      //   </View>
      //   <ListItem noIndent>
      //     <View>
      //       <Text>{street}</Text>
      //       <Text>
      //         {postcode} {city}
      //       </Text>
      //     </View>
      //   </ListItem>
      //   <Separator>
      //     <Text>Kontakt</Text>
      //   </Separator>
      //   <ListItem noIndent>
      //     <Text>{email}</Text>
      //   </ListItem>
      //   <ListItem noIndent>
      //     <Text>{phone}</Text>
      //   </ListItem>
      //   <Separator />
      // </List>
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
