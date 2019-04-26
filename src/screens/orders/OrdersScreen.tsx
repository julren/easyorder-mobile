import React, { Component } from "react";
import { Image, FlatList, View, Dimensions } from "react-native";

import firebase, { firebaseOrders } from "../../config/firebase";
import { Text, ListItem } from "react-native-elements";
import { NavigationParams } from "react-navigation";
import { Order } from "../../models/Order";

interface OrdersScreenProps {
  navigation: NavigationParams;
}
interface OrdersScreenState {
  orders: Order[];
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
    this.setState({ loading: true });

    firebaseOrders
      .where("customerID", "==", "UIC6MGkgiQg0QLWLBUgikC8gSGa2")
      .get()
      .then(querySnapshot => {
        const orders = [];

        querySnapshot.forEach(doc => {
          orders.push({
            ...doc.data(),
            orderID: doc.id,
            orderDate: doc.data().orderDate.toDate()
          });
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
            subtitle={item.orderDate.toLocaleString([], {
              day: "2-digit",
              month: "2-digit",
              year: "numeric"
            })}
            // subtitle={item.items.map(item => `${item.item.name} | `)}
            onPress={() =>
              this.props.navigation.navigate("OrderDetail", {
                order: item
              })
            }
          />
        )}
        ListEmptyComponent={
          this.state.loading ? null : (
            <View
              style={{
                padding: 16,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text h2>Keine Bestellungen bisher</Text>
            </View>
          )
        }
      />
    );
  }
}

export default OrdersScreen;
