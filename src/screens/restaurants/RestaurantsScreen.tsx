import React from "react";
import { FlatList } from "react-native";

import {
  NavigationEvents,
  NavigationScreenProp,
  NavigationScreenProps
} from "react-navigation";

import { firebaseRestaurants } from "../../config/firebase";
import RestaurantCard from "./RestaurantCard";
import RestaurantsMap from "./RestaurantsMap";
import {
  withCartContext,
  CartContextProps,
  CartContext
} from "../cart/CartContext";

import { Text, Button, Header, Icon } from "react-native-elements";
import Container from "../../components/Container";
import PageLoadingIndicator from "../../components/PageLoadingIndicator";
import { Permissions } from "expo";
import { Location } from "expo";
import { Restaurant } from "../../models/Restaurant";

interface Props extends NavigationScreenProps, CartContextProps {}
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
    return {
      title: "Restaurants",
      headerRight: (
        <Button
          icon={{ name: "map", color: "#fff" }}
          type="clear"
          onPress={() =>
            navigation.navigate("RestaurantsMap", {
              restaurants: navigation.getParam("restaurants", {}),
              location: navigation.getParam("location", {})
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
    this._getLocationAsync();
    // Get Restaurants from database
    firebaseRestaurants
      .get()
      .then(querySnapshot => {
        let restaurantsData = [];
        querySnapshot.forEach(function(doc) {
          restaurantsData.push({ id: doc.id, ...doc.data() });
        });
        this.props.navigation.setParams({ restaurants: restaurantsData });
        this.setState({ restaurants: restaurantsData });
      })
      .catch(error => {
        console.error("Error getting document..: ", error);
      });
  }

  _getLocationAsync = async () => {
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

    console.log(locationDetails);
    this.props.navigation.setParams({ location: locationDetails });
    this.setState({ location: locationDetails });
  };

  render() {
    const { restaurants, location } = this.state;

    // Consumes Cart Context to be able to clear cart when the user goes back to list from restaurant view
    const { cartContext } = this.props;

    if (restaurants.length == 0) return <PageLoadingIndicator />;

    return (
      <React.Fragment>
        <Container padded>
          {/* Helper from react-navigation. When Screen will focus (be active) clear cart of cartContext */}
          <NavigationEvents
            onWillFocus={payload => cartContext.clearCartContext()}
          />

          {/* Kartenansicht der Restaurants */}
          {/* <Content padder> */}
          {/* <Card>
              <CardItem>
                 <RestaurantsMap restaurants={restaurants} />
                 </CardItem>
                </Card> */}

          {/* Liste der Restaurantdarstellung rendern */}

          <Text h1>Restaurants in der Nähe</Text>

          {this.state.location ? (
            <Text>
              {this.state.location.address.road},
              {this.state.location.address.town}
            </Text>
          ) : null}

          <FlatList
            keyExtractor={item => item.id}
            data={this.state.restaurants}
            renderItem={({ item }) => (
              <RestaurantCard
                restaurant={item}
                onRestaurantSelect={() =>
                  this.props.navigation.navigate("RestaurantDetail", {
                    restaurant: item
                  })
                }
              />
            )}
          />
        </Container>
      </React.Fragment>
    );
  }
}

export default withCartContext(RestaurantsScreen);
