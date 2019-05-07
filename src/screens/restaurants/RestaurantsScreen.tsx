import React from "react";
import { FlatList } from "react-native";

import { NavigationEvents, NavigationScreenProp } from "react-navigation";

import RestaurantCard from "./RestaurantCard";

import { Text, Button, Header, Icon } from "react-native-elements";
import Container from "../../components/basic/Container";
import PageLoadingIndicator from "../../components/basic/PageLoadingIndicator";
import { Permissions } from "expo";
import { Location } from "expo";
import { GlobalContext } from "../../contexts/GlobalContext";
import withGlobalContext from "../../contexts/withGlobalContext";
import CacheImage from "../../components/basic/CachedImage";
import { Restaurant } from "../../models";
import { firebaseRestaurants } from "../../config/firebase";

interface Props {
  navigation: NavigationScreenProp<any>;
  globalContext: GlobalContext;
}
interface State {
  restaurants: Restaurant[];
  location: any;
  errorMessage: any;
}

/**
 * Screen that shows List of nearby restaurants
 */
class RestaurantsScreen extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    const location = navigation.getParam("location", undefined);

    return {
      title: location
        ? `${location.address.road}, ${location.address.town}`
        : "Restaurants in der Nähe",
      headerRight: (
        <Button
          icon={{ name: "map", color: "#fff" }}
          type="clear"
          onPress={() =>
            navigation.navigate("RestaurantsMap", {
              location: location
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
      location: undefined,
      errorMessage: ""
    };
    this.props.navigation.setParams({ title: "Restaurants" });
  }

  componentDidMount() {
    this.getLocationAsync();
    this.getRestaurants();
    // Get Restaurants from database
    // this.props.navigation.setParams({ restaurants: this.props.globalContext.restaurants });
  }

  getRestaurants = () => {
    firebaseRestaurants
      .get()
      .then(querySnapshot => {
        let restaurantsData = [];
        querySnapshot.forEach(function(doc) {
          restaurantsData.push({ id: doc.id, ...doc.data() });
        });
        this.setState({ restaurants: restaurantsData });
      })
      .catch(error => {
        console.error("Error getting restaurants..: ", error);
      });
  };

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});

    const locationDetails = await fetch(
      `https://nominatim.openstreetmap.org/reverse.php?format=html&lat=${
        location.coords.latitude
      }&lon=${location.coords.longitude}&format=json`
    )
      .then(response => response.json())
      .then(responseJson => {
        return responseJson;
      });

    this.props.navigation.setParams({ location: locationDetails });
    this.setState({ location: locationDetails });
  };

  render() {
    // Consumes Cart Context to be able to clear cart when the user goes back to list from restaurant view
    const { globalContext } = this.props;
    const { restaurants } = this.state;

    if (restaurants.length == 0) return <PageLoadingIndicator />;

    return (
      <React.Fragment>
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
              </Container>
            }
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
      </React.Fragment>
    );
  }
}

export default withGlobalContext(RestaurantsScreen);
