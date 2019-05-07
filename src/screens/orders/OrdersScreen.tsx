import React, { Component } from "react";
import { Image, FlatList, View, Dimensions } from "react-native";

import firebase, { firebaseOrders } from "../../config/firebase";
import { Text, ListItem, Badge } from "react-native-elements";
import { NavigationParams } from "react-navigation";
import { Order } from "../../models/Order";
import TextNote from "../../components/basic/TextNote";
import Row from "../../components/basic/Row";

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
        this.setState({ orders: orders.reverse(), loading: false });
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
            title={
              <Row>
                <Text>{item.restaurant.name}</Text>
              </Row>
            }
            rightTitle={`${parseFloat(item.grandTotal).toFixed(2)} €`}
            subtitle={
              <View>
                <TextNote>
                  {item.orderDate.toLocaleString([], {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                  })}
                </TextNote>
                <Badge
                  containerStyle={{ alignSelf: "flex-start" }}
                  status={badgeColorForStatus[item.status]}
                  value={item.status}
                />
              </View>
            }
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

const badgeColorForStatus = {
  open: "primary",
  inProgress: "warning",
  done: "success"
};
