import React, { Component } from "react";
import { Image, FlatList, View, Dimensions } from "react-native";

import firebase, { firebaseOrders } from "../../config/firebase";
import { Text, ListItem, Badge } from "react-native-elements";
import { NavigationParams } from "react-navigation";
import { Order } from "../../models/Order";
import TextNote from "../../components/basic/TextNote";
import Row from "../../components/basic/Row";
import { Container } from "../../components";
import { displayNameForOrderStatus } from "../../config/displayNamesForValues";

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
    try {
      firebaseOrders
        .where("customerID", "==", firebase.auth().currentUser.uid)
        .get()
        .then(querySnapshot => {
          const orders = [];

          querySnapshot.forEach(doc => {
            orders.push({
              ...doc.data(),
              id: doc.id,
              orderDate: doc.data().orderDate.toDate()
            });
          });
          this.setState({ orders: orders.reverse(), loading: false });
        });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  };

  render() {
    const { orders } = this.state;

    return (
      <FlatList
        data={orders}
        ListHeaderComponent={
          <Container padded="more">
            <Text h1>Meine Bestellungen</Text>
          </Container>
        }
        ListEmptyComponent={
          !this.state.loading && (
            <Container padded="more">
              <Text>Keine Bestellungen bisher</Text>
            </Container>
          )
        }
        keyExtractor={item => item.id}
        onRefresh={() => this.getOrdersOfUser()}
        refreshing={this.state.loading}
        renderItem={({ item }) => (
          <ListItem
            key={item.id}
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
                  badgeStyle={{
                    backgroundColor: badgeColorForStatus[item.status]
                  }}
                  value={displayNameForOrderStatus[item.status]}
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
      />
    );
  }
}

export default OrdersScreen;

const badgeColorForStatus = {
  open: "#3E8ADC",
  inProgress: "#F6AC14",
  readyForServing: "#53C419",
  archived: "#a7a7a7"
};
