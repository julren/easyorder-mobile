import { MapView } from "expo";
import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem, Text } from "react-native-elements";
import CacheImage from "../../components/basic/CachedImage";
import Separator from "../../components/basic/Separator";
import {
  displayNameForWeekday,
  displayNameForPriceCategory
} from "../../config/displayNamesForValues";
import { Restaurant } from "../../models/Restaurant";
import Container from "../../components/basic/Container";
import Row from "../../components/basic/Row";
import StarRating from "react-native-star-rating";

interface IProps {
  restaurant: Restaurant;
}
interface IState {}

class RestaurantInfoTab extends PureComponent<IProps, IState> {
  render() {
    const { restaurant } = this.props;
    const {
      name,
      media: { logo },
      priceClass,
      description,
      businessHours,
      contactInfo: { email, phone },
      address: { city, street, postcode, lat, lon }
    } = restaurant;

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);
    return (
      <View style={{ paddingBottom: 32 }}>
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
              <Row>
                <StarRating
                  disabled
                  containerStyle={{ justifyContent: "flex-start" }}
                  starSize={12}
                  maxStarts={5}
                  rating={restaurant.rating ? restaurant.rating.avgRating : 0}
                  fullStarColor="#FFD700"
                  emptyStarColor="#d3d3d3"
                />
                <Text style={{ color: "grey", fontSize: 12, marginLeft: 4 }}>
                  ({restaurant.rating ? restaurant.rating.totalNumRatings : 0})
                </Text>
              </Row>
            </View>
          }
        />
        <Separator heading="Allgemein" />

        <ListItem
          leftIcon={{
            iconStyle: { fontSize: 18, color: "#282828" },
            name: "access-time"
          }}
          containerStyle={{ alignItems: "flex-start" }}
          bottomDivider
          title={
            <View>
              <Text h4>Öffnungszeiten</Text>
              {businessHours.map((businessHour, index) => (
                <Row key={index} style={{ justifyContent: "space-between" }}>
                  <Text>{displayNameForWeekday[businessHour.day]}</Text>
                  <Text>
                    {businessHour.openingHour} - {businessHour.closingHour}
                  </Text>
                </Row>
              ))}
            </View>
          }
        />
        <ListItem
          bottomDivider
          title="Preisklasse"
          rightSubtitle={displayNameForPriceCategory[restaurant.priceClass]}
          rightSubtitleStyle={{ fontSize: 14 }}
          leftIcon={{
            iconStyle: { fontSize: 18, color: "#282828" },
            name: "euro-symbol"
          }}
        />
        <ListItem
          bottomDivider
          title="Küche"
          rightSubtitle={restaurant.cuisine}
          rightSubtitleStyle={{ fontSize: 14 }}
          leftIcon={{
            iconStyle: { fontSize: 18, color: "#282828" },
            name: "silverware-variant",
            type: "material-community"
          }}
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
        <ListItem
          title={street}
          subtitle={`${postcode} ${city}`}
          leftIcon={{
            iconStyle: { fontSize: 18, color: "#282828" },
            name: "location-on"
          }}
        />

        <Separator heading="Kontakt" />
        <ListItem
          title={email}
          leftIcon={{
            iconStyle: { fontSize: 18, color: "#282828" },
            name: "mail"
          }}
        />
        <ListItem
          title={phone}
          leftIcon={{
            iconStyle: { fontSize: 18, color: "#282828" },
            name: "phone"
          }}
        />
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
