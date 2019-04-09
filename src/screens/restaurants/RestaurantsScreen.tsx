import React from "react";
import { FlatList } from "react-native";

import {
  NavigationEvents,
  NavigationScreenProp,
  NavigationScreenProps
} from "react-navigation";
import Restaurant from "./Restaurant";

import { firebaseRestaurants } from "../../config/firebase";
import RestaurantCard from "./RestaurantCard";
import RestaurantsMap from "./RestaurantsMap";
import {
  withCartContext,
  CartContextProps,
  CartContext
} from "../cart/CartContext";

import { Text } from "react-native-elements";
import Container from "../../components/Container";
import PageLoadingIndicator from "../../components/PageLoadingIndicator";

interface Props extends NavigationScreenProps, CartContextProps {}
interface State {
  restaurants: Restaurant[];
}

/**
 * Screen that shows List of nearby restaurants
 */
class RestaurantsScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: "Restaurants"
  };

  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    };
    this.props.navigation.setParams({ title: "Restaurants" });
  }

  componentDidMount() {
    // Get Restaurants from database
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
        console.error("Error getting document..: ", error);
      });
  }

  render() {
    const { restaurants } = this.state;

    // Consumes Cart Context to be able to clear cart when the user goes back to list from restaurant view
    const { cartContext } = this.props;

    if (restaurants.length == 0) return <PageLoadingIndicator />;

    return (
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
    );
  }
}

export default withCartContext(RestaurantsScreen);
