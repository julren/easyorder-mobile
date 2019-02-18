import React, { Component } from "react";
import { Image } from "react-native";
import {
  Content,
  Container,
  Text,
  H2,
  List,
  Separator,
  ListItem,
  Left,
  Right,
  Thumbnail,
  Body,
  View
} from "native-base";
import firebase, { firebaseOrders } from "../../config/firebase";

class OrderOverviewScreen extends Component {
  static navigationOptions = {
    title: "Bestellübersicht"
  };

  constructor(props) {
    super(props);
    this.state = {
      order: undefined
    };

    const orderID = this.props.navigation.getParam(
      "orderID",
      "gDroVEVZ2Ysxrg4dy6AI"
    );
    if (orderID) this.getOrderById(orderID);
  }

  getOrderById = orderID => {
    // If screen received a orderID, get order from firebase
    if (orderID) {
      firebaseOrders
        .doc(orderID)
        .get()
        .then(orderDoc => {
          if (orderDoc.exists) {
            this.setState({
              order: { orderID: orderDoc.id, ...orderDoc.data() }
            });
          }
        })
        .catch(error => {
          console.warn(error);
        });
    }
  };

  render() {
    const order = this.state.order;

    if (!order) {
      return <Text>Bestellübersicht ist leer</Text>;
    } else {
      return (
        <Container style={{ backgroundColor: "#F0EFF5" }}>
          <Content>
            <List>
              <ListItem itemHeader first>
                <H2 style={{ fontWeight: "bold" }}>Bestellübersicht</H2>
              </ListItem>
              <ListItem>
                <View>
                  <Text>Bestellnummer: {order.orderID}</Text>
                  <Text>Bei: {order.restaurant.name}</Text>
                  <Text>
                    Bestelldatum:
                    {order.orderDate.toDate().toLocaleString([], {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </Text>
                </View>
              </ListItem>

              <Separator bordered>
                <Text>Deine Bestellung</Text>
              </Separator>
              {order.items.map((element, index) => (
                <ListItem thumbnail key={index}>
                  <Left>
                    <Thumbnail square source={{ uri: element.item.photo }} />
                  </Left>
                  <Body>
                    <Text>
                      {element.quantity}x {element.item.name}
                    </Text>
                    <Text note numberOfLines={1}>
                      {element.item.description}
                    </Text>
                  </Body>
                  <Right
                    style={{
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    <Text>
                      {parseFloat(
                        element.quantity * element.item.price
                      ).toFixed(2)}
                      €
                    </Text>
                  </Right>
                </ListItem>
              ))}

              <ListItem>
                <Left>
                  <Text>Inkl. Mwst</Text>
                </Left>
                <Right>
                  <Text>{order.mwst}€</Text>
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text style={{ fontWeight: "bold" }}>Summe</Text>
                </Left>
                <Right>
                  <Text style={{ fontWeight: "bold" }}>
                    {order.grandTotal}€
                  </Text>
                </Right>
              </ListItem>
            </List>
          </Content>
        </Container>
      );
    }
  }
}

export default OrderOverviewScreen;
