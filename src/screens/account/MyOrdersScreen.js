import React, { Component } from "react";
import { Image } from "react-native";
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
      orders: []
    };
  }

  componentDidMount() {
    this.getOrdersOfUser();
  }

  getOrdersOfUser = async () => {
    //TODO: Nur Bestellungen des eingeloggten Users Anzeigen
    // const currentUser = await firebase.auth().currentUser.uid;

    firebaseOrders.get().then(querySnapshot => {
      const orders = [];

      querySnapshot.forEach(doc => {
        orders.push({ orderID: doc.id, ...doc.data() });
      });
      this.setState({ orders: orders });
    });
  };

  render() {
    const { orders } = this.state;
    if (orders.length == 0) return <Spinner />;
    console.log(orders[0]);
    return (
      <Container>
        <Content padder>
          {orders.map(order => (
            <Card key={order.orderID}>
              <CardItem
                button
                onPress={() =>
                  this.props.navigation.navigate("OrderDetail", {
                    order,
                    order
                  })
                }
              >
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
                    <Text note>
                      {order.items.map(item => `${item.item.name} `)}
                    </Text>
                  </Body>
                </Left>
                <Right style={{ flex: 0.2 }}>
                  <Text note>{order.grandTotal} €</Text>
                </Right>
              </CardItem>
            </Card>
          ))}
        </Content>
      </Container>
    );
  }
}

export default MyOrdersScreen;
