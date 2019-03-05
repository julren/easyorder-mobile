import React, { Component } from "react";
import { Image, FlatList, View } from "react-native";
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Card,
  Body,
  H3,
  Right,
  CardItem,
  Left,
  Thumbnail,
  Spinner
} from "native-base";
import firebase, { firebaseOrders } from "../../config/firebase";

class MyOrdersScreen extends Component {
  static navigationOptions = {
    title: "Bestellungen"
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {},
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
      <View style={{ flex: 1, padding: 8 }}>
        <FlatList
          data={orders}
          keyExtractor={item => item.orderID}
          onRefresh={() => this.getOrdersOfUser()}
          refreshing={this.state.loading}
          renderItem={({ item }) => (
            <OrderCard
              order={item}
              onPress={() =>
                this.props.navigation.navigate("OrderDetail", {
                  orderID: item.orderID
                })
              }
            />
          )}
          ListEmptyComponent={<ListEmpty loading={this.state.loading} />}
        />
      </View>
    );
  }
}

export default MyOrdersScreen;

const ListEmpty = ({ loading }) => {
  if (loading) {
    return <React.Fragment />;
  } else {
    return (
      <Text style={{ alignSelf: "center", padding: 8 }}>
        Keine Bestellungen bisher
      </Text>
    );
  }
};

const OrderCard = ({ order, onPress }) => (
  <Card key={order.orderID}>
    <CardItem button onPress={onPress}>
      <Left>
        <Thumbnail square source={{ uri: order.restaurant.logo }} />

        <Body>
          <Text style={{ fontWeight: "bold", color: "#5BC0EB" }}>
            {order.restaurant.name}
          </Text>
          <Text note>
            {order.orderDate.toDate().toLocaleString([], {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })}
          </Text>
          <Text note>{order.items.map(item => `${item.item.name} | `)}</Text>
        </Body>
      </Left>
      <Right style={{ flex: 0.2 }}>
        <Text note>{parseFloat(order.grandTotal).toFixed(2)} €</Text>
      </Right>
    </CardItem>
  </Card>
);
