import { MapView } from "expo";
import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem, Text } from "react-native-elements";
import CacheImage from "../../../components/basic/CachedImage";
import Separator from "../../../components/basic/Separator";
import { displayNameForWeekday } from "../../../config/displayNamesForValues";
import { Restaurant } from "../../../models/Restaurant";

interface IProps {
  restaurant: Restaurant;
}
interface IState {}

class RestaurantInfoTab extends PureComponent<IProps, IState> {
  render() {
    const {
      restaurant: {
        name,
        media: { logo },
        priceClass,
        description,
        businessHours,
        contactInfo: { email, phone },
        address: { city, street, postcode, lat, lon }
      }
    } = this.props;

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);
    return (
      <View>
        <ListItem
          leftAvatar={
            <CacheImage
              source={{ uri: logo }}
              resizeMode="contain"
              style={{ width: 40, height: 40 }}
            />
          }
          title={
            <View>
              <Text h1>{name}</Text>
              <Text style={{ color: "grey" }}>{description}</Text>
            </View>
          }
        />
        <Separator heading="Öffnungszeiten" />

        {businessHours.map((businessHour, index) => (
          <ListItem
            key={index}
            bottomDivider
            title={<Text>{displayNameForWeekday[businessHour.day]}</Text>}
            rightElement={
              <Text>
                {businessHour.openingHour} - {businessHour.closingHour}
              </Text>
            }
          />
        ))}

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
