import React, { Component } from "react";
import { Container, Content, List, ListItem, Text } from "native-base";
import firebase, { firebaseOrders } from "../../config/firebase";

class MyOrdersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      orders: []
    };
  }

  componentDidMount() {}

  getOrdersOfUser = () => {
    debugger;
    const user = firebase.auth().currentUser.uid;

    firebaseOrders
      .where("customerID", "==", firebase.auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        const orders = [];
        debugger;

        querySnapshot.forEach(doc => {
          orders.push({ orderID: doc.id, ...doc.data() });
        });
        debugger;
        this.setState({ orders: orders });
      });
  };

  render() {
    const { orders } = this.state;
    if (orders.length == 0) return <Text>Keine Bestellungen</Text>;
    return (
      <Container>
        <Content>
          <List>
            {orders.map((order, index) => {
              <ListItem>
                <Text>{order.orderID}</Text>
              </ListItem>;
            })}
          </List>
        </Content>
      </Container>
    );
  }
}

export default MyOrdersScreen;
