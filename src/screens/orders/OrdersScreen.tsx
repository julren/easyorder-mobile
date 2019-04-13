import React, { Component } from "react";
import { Image, FlatList, View } from "react-native";

import firebase, { firebaseOrders } from "../../config/firebase";
import { Text, ListItem } from "react-native-elements";
import { NavigationParams } from "react-navigation";

interface OrdersScreenProps {
  navigation: NavigationParams;
}
interface OrdersScreenState {
  orders: any[];
  loading: boolean;
}

class OrdersScreen extends Component<OrdersScreenProps, OrdersScreenState> {
  static navigationOptions = {
    title: "Bestellungen"
  };

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      loading: false
    };
  }

  componentDidMount() {
    this.getOrdersOfUser();
  }

  getOrdersOfUser = async () => {
    console.log("refresh");
    this.setState({ loading: true });
    //TODO: Nur Bestellungen des eingeloggten Users Anzeigen
    // const currentUser = await firebase.auth().currentUser.uid;
    firebaseOrders.get().then(querySnapshot => {
      const orders = [];

      querySnapshot.forEach(doc => {
        orders.push({ orderID: doc.id, ...doc.data() });
      });
      this.setState({ orders: orders, loading: false });
    });
  };

  render() {
    const { orders } = this.state;

    return (
      <FlatList
        data={orders}
        keyExtractor={item => item.orderID}
        onRefresh={() => this.getOrdersOfUser()}
        refreshing={this.state.loading}
        renderItem={({ item }) => (
          <ListItem
            key={item.orderID}
            leftAvatar={{
              rounded: false,
              source: { uri: item.restaurant.logo, cache: "force-cache" }
            }}
            title={item.restaurant.name}
            rightTitle={`${parseFloat(item.grandTotal).toFixed(2)} €`}
            subtitle={item.orderDate.toDate().toLocaleString([], {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })}
            // subtitle={item.items.map(item => `${item.item.name} | `)}
            onPress={() =>
              this.props.navigation.navigate("OrderDetail", {
                orderID: item.orderID
              })
            }
          />
        )}
        ListEmptyComponent={
          this.state.loading ? null : (
            <Text h2 style={{ alignSelf: "center", padding: 8 }}>
              Keine Bestellungen bisher
            </Text>
          )
        }
      />
    );
  }
}

export default OrdersScreen;
