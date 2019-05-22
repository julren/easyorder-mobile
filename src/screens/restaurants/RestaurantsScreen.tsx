import { Location, Permissions } from "expo";
import { Accuracy } from "expo-location";
import geohash from "ngeohash";
import React from "react";
import { FlatList } from "react-native";
import { Button, Text } from "react-native-elements";
import { NavigationEvents, NavigationScreenProps } from "react-navigation";
import Container from "../../components/basic/Container";
import PageLoadingIndicator from "../../components/basic/PageLoadingIndicator";
import { firebaseRestaurants } from "../../config/firebase";
import withGlobalContext, {
  WithGlobalContextProps
} from "../../contexts/withGlobalContext";
import { Restaurant } from "../../models";
import RestaurantCard from "./RestaurantCard";

interface IProps extends NavigationScreenProps<any>, WithGlobalContextProps {}

interface IState {
  restaurants: Restaurant[];
  currentLocationGeoHash: string;
  location: any;
  errorMessage: any;
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
      errorMessage: ""
    };
    this.props.navigation.setParams({ title: "Restaurants" });
  }

  async componentDidMount() {
    const location = await this.getLocationAsync();

    if (location) {
      const currentLocationGeoHash = geohash.encode(
        location.coords.latitude,
        location.coords.longitude,
        7
      );

      this.setState({ currentLocationGeoHash: currentLocationGeoHash });

      this.getLocationAddress(location);
      this.getRestaurants(location);
    }
  }

  getRestaurants = location => {
    const currentLocationGeohash = geohash.encode(
      location.coords.latitude,
      location.coords.longitude,
      3
    );
    console.log("location", location);
    console.log("currentLocationGeohash", currentLocationGeohash);

    firebaseRestaurants
      .where("address.geohash", ">=", currentLocationGeohash)
      .orderBy("address.geohash")
      .get()
      .then(querySnapshot => {
        let restaurantsData = [];
        querySnapshot.forEach(function(doc) {
          restaurantsData.push({ id: doc.id, ...doc.data() });
        });
        console.log("found num restaurants: ", restaurantsData.length);
        this.setState({ restaurants: restaurantsData });
        this.props.navigation.setParams({ restaurants: restaurantsData });
      })
      .catch(error => {
        console.error("Error getting restaurants..: ", error);
      });
  };

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      return this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    return Location.getCurrentPositionAsync({ accuracy: Accuracy.Balanced });
  };

  getLocationAddress = async location => {
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
    const { restaurants, currentLocationGeoHash, location } = this.state;

    if (restaurants.length == 0) return <PageLoadingIndicator />;

    return (
      <Container>
        {/* Helper from react-navigation. When Screen will focus (be active) clear cart of globalContext */}
        <NavigationEvents
          onWillFocus={payload => globalContext.resetSelectedRestaurant()}
        />

        {/* Liste der Restaurantdarstellung rendern */}

        <FlatList
          ListHeaderComponent={
            <Container>
              <Text h1>Restaurants in der Nähe</Text>
              <Text>
                {location
                  ? `${location.address.road}, ${
                      location.address.town
                        ? location.address.town
                        : location.address.county
                    }`
                  : null}
              </Text>
            </Container>
          }
          contentContainerStyle={{ padding: 8 }}
          keyExtractor={item => item.id}
          data={restaurants}
          renderItem={({ item }) => (
            <RestaurantCard
              currentLocationGeoHash={currentLocationGeoHash}
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
