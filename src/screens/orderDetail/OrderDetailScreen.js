import React, { Component } from "react";
import { Container, Content, Text } from "native-base";

class OrderDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const order = this.props.navigation.getParam("order", placeholderData);
    return (
      <Container>
        <Content>
          <Text>Order Detail</Text>
          <Text>{order.orderID}</Text>
        </Content>
      </Container>
    );
  }
}

export default OrderDetailScreen;

const placeholderData = {
  order: {
    orderID: "gDroVEVZ2Ysxrg4dy6AI",
    customerID: "WTpxRrjqspaedb8EnBTMRO1KVDM2",
    grandTotal: "5.90",
    items: [
      {
        item: {
          authorID: "WTpxRrjqspaedb8EnBTMRO1KVDM2",
          categoryID: "2fsrzrm1G9kKGBJ7trzD",
          description: "Aubergine, Paprika, Champignons",
          id: "X9aoZGGWaQJkHFFyJ8fS",
          name: "Antipasti Mista",
          photo:
            "https://firebasestorage.googleapis.com/v0/b/***REMOVED***/o/public%2Fimages%2FmenuItem-X9aoZGGWaQJkHFFyJ8fS.jpg?alt=media&token=986e0a04-7171-4e8e-8b57-4193a44ec901",
          price: 5.9
        },
        quantity: 1
      }
    ],
    mwst: "1.12",
    orderDate: {
      seconds: 1549795282,
      nanoseconds: 322000000
    },
    paymentMethod: "",
    restaurant: {
      coverPhoto:
        "https://firebasestorage.googleapis.com/v0/b/***REMOVED***/o/public%2Fimages%2FcoverPhoto-WTpxRrjqspaedb8EnBTMRO1KVDM2.jpg?alt=media&token=66eb5e45-21ce-4782-ad6d-fc5a2a188935",
      logo:
        "https://firebasestorage.googleapis.com/v0/b/***REMOVED***/o/public%2Fimages%2Flogo-WTpxRrjqspaedb8EnBTMRO1KVDM2.png?alt=media&token=50c1b9d5-c1f0-4b0b-bb1e-ed25c202a5e9",
      name: "La Dolce Vita",
      restaurantID: "9kkHKCKHzTUl4sC7uDoD"
    },
    table: ""
  }
};
