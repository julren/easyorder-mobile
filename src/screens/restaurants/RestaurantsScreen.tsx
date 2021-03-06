import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Accuracy } from "expo-location";
import geohash from "ngeohash";
import React from "react";
import { FlatList, View } from "react-native";
import { Button, Text, Icon } from "react-native-elements";
import { NavigationEvents, NavigationScreenProps } from "react-navigation";
import Container from "../../components/basic/Container";
import PageLoadingIndicator from "../../components/basic/PageLoadingIndicator";
import { firebaseRestaurants } from "../../config/firebase";
import withGlobalContext, {
  WithGlobalContextProps
} from "../../contexts/withGlobalContext";
import { Restaurant } from "../../models";
import RestaurantCard from "./RestaurantCard";
import TextNote from "../../components/basic/TextNote";
import utils from "../../utils/utils";
import Row from "../../components/basic/Row";
import geohashDistance from "geohash-distance";

interface IProps extends NavigationScreenProps<any>, WithGlobalContextProps {}

// Nutzer nach Standortfreigabe fragen
async function getLocationAsync() {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status === "granted") {
    return Location.getCurrentPositionAsync({
      accuracy: Accuracy.Balanced
    });
  } else {
    alert("Bitte gewähren Sie der App Sie Zugriff auf Ihren Standort");
  }
}

interface IState {
  restaurants: Restaurant[];
  currentLocationGeoHash: string;
  location: any;
  loading: boolean;
}

/**
 * Screen that shows List of nearby restaurants
 */
class RestaurantsScreen extends React.Component<IProps, IState> {
  static navigationOptions = ({ navigation }) => {
    const location = navigation.getParam("location", undefined);
    const restaurants = navigation.getParam("restaurants", []);
    return {
      title: "Restaurants",
      headerRight: (
        <Button
          icon={{ name: "map", color: "#fff" }}
          type="clear"
          onPress={() =>
            navigation.navigate("RestaurantsMap", {
              location: location,
              restaurants: restaurants
            })
          }
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      currentLocationGeoHash: "",
      location: undefined,
      loading: true
    };
  }

  async componentDidMount() {
    const location = await this.getLocationAsync();

    if (location) {
      const currentLocationGeoHash = geohash.encode(
        location.coords.latitude,
        location.coords.longitude,
        7
      );

      this.getLocationInfosForCoords(location);
      this.getRestaurants(location, currentLocationGeoHash);
    }
  }

  getRestaurants = (location, currentLocationGeoHash) => {
    const geoHashNearbyBoundingBox = geohash.encode(
      location.coords.latitude,
      location.coords.longitude,
      3
    );

    firebaseRestaurants
      .where("address.geohash", ">=", geoHashNearbyBoundingBox)
      .orderBy("address.geohash")
      .get()
      .then(querySnapshot => {
        let restaurants = [];
        querySnapshot.forEach(function(doc) {
          const distanceFromUser = geohashDistance.inKm(
            currentLocationGeoHash,
            geohash.encode(doc.data().address.lat, doc.data().address.lon, 7)
          );

          restaurants.push({
            id: doc.id,
            distanceFromUser: distanceFromUser,
            ...doc.data()
          });
        });

        const sortedByDistanceRestaurants = restaurants.sort(
          (a, b) => a.distanceFromUser - b.distanceFromUser
        );

        this.setState({
          restaurants: sortedByDistanceRestaurants,
          loading: false
        });
        this.props.navigation.setParams({
          restaurants: sortedByDistanceRestaurants
        });
      })
      .catch(error => {
        console.error("Error getting restaurants..: ", error);
      });
  };

  // Nutzer nach Standortfreigabe fragen
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === "granted") {
      return Location.getCurrentPositionAsync({
        accuracy: Accuracy.Balanced
      });
    } else {
      alert("Bitte gewähren Sie der App Sie Zugriff auf Ihren Standort");
    }
  };

  getLocationInfosForCoords = async location => {
    utils.getLocationInfosForCoords(
      location.coords.latitude,
      location.coords.longitude
    );

    const locationDetails = await fetch(
      `https://nominatim.openstreetmap.org/reverse.php?format=html&lat=${
        location.coords.latitude
      }&lon=${location.coords.longitude}&format=json`
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        return responseJson;
      });

    this.props.navigation.setParams({ location: locationDetails });
    this.setState({ location: locationDetails });
  };

  render() {
    // Consumes Cart Context to be able to clear cart when the user goes back to list from restaurant view
    const { globalContext } = this.props;
    const {
      restaurants,
      currentLocationGeoHash,
      location,
      loading
    } = this.state;

    if (loading) return <PageLoadingIndicator />;

    return (
      <Container>
        {/* Helper from react-navigation. When Screen will focus (be active) clear cart of globalContext */}
        <NavigationEvents
          onWillFocus={payload => globalContext.resetSelectedRestaurant()}
        />

        <FlatList
          ListHeaderComponent={<ListHeaderComponent location={location} />}
          ListEmptyComponent={<ListEmptyComponent />}
          contentContainerStyle={{ padding: 8 }}
          keyExtractor={item => item.id}
          data={restaurants}
          renderItem={({ item }) => (
            <RestaurantCard
              restaurant={item}
              onRestaurantSelect={() => {
                this.props.globalContext.setSelectedRestaurant(item);
                this.props.navigation.navigate("Menu", {
                  restaurant: item
                });
              }}
            />
          )}
        />
      </Container>
    );
  }
}

export default withGlobalContext(RestaurantsScreen);

const ListHeaderComponent = ({ location }) => (
  <Container>
    <Text h1>Restaurants in der Nähe</Text>
    <Row>
      <Icon
        name="location-on"
        containerStyle={{ marginRight: 4 }}
        iconStyle={{ fontSize: 16 }}
      />
      <Text>
        {location
          ? `${location.address.road}, ${
              location.address.town
                ? location.address.town
                : location.address.county
            }`
          : null}
      </Text>
    </Row>
  </Container>
);

const ListEmptyComponent = () => (
  <Container style={{ marginTop: 18 }}>
    <TextNote>☹️ Keine Restaurants in der Nähe</TextNote>
  </Container>
);
