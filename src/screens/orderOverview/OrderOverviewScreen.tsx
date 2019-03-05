import React, { Component } from "react";
import { Image, ImageBackground, Modal } from "react-native";
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
  View,
  Button,
  Icon,
  H1,
  H3,
  Spinner
} from "native-base";
import firebase, {
  firebaseOrders,
  firebaseReviews
} from "../../config/firebase";
import { NavigationScreenProp } from "react-navigation";
import RateRestaurantModal from "./RateRestaurantModal";
import LeaveReviewButton from "./LeaveReviewButton";

class OrderOverviewScreen extends Component<Props, State> {
  static navigationOptions = {
    title: "Bestellübersicht",
    headerLeft: null
  };

  constructor(props) {
    super(props);
    this.state = {
      order: undefined,
      rateRestaurantModalVisible: false,
      review: undefined
    };
  }

  getOrderById = orderID => {
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
  };

  async componentDidMount() {
    const orderID = this.props.navigation.getParam(
      "orderID",
      "gDroVEVZ2Ysxrg4dy6AI"
    );
    this.getOrderById(orderID);
  }

  render() {
    const { order } = this.state;

    if (!order) {
      return <Spinner />;
    } else {
      return (
        <Container>
          <Content>
            <List>
              <ImageBackground
                source={{ uri: order.restaurant.coverPhoto }}
                style={{
                  height: 200,
                  imageStyle: { opacity: 20 }
                }}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(60, 109, 130, 0.7)",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Icon
                    name="silverware"
                    type="MaterialCommunityIcons"
                    style={{ color: "#fff", fontSize: 50 }}
                  />
                  <Text style={{ color: "#fff" }}>Deine Bestellung bei</Text>
                  <H1 style={{ color: "#fff", fontWeight: "bold" }}>
                    {order.restaurant.name}
                  </H1>
                </View>
              </ImageBackground>
              <ListItem>
                <View>
                  <Text note>Bestellnummer: {order.orderID}</Text>
                  <Text note>
                    Bestelldatum:{` `}
                    {order.orderDate.toDate().toLocaleString([], {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </Text>
                  <Text note>Zahlungsart: {order.paymentMethod}</Text>
                  <Text note>Tischnummer: {order.table}</Text>
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
                      {(element.quantity * element.item.price).toFixed(2)}€
                    </Text>
                  </Right>
                </ListItem>
              ))}

              <ListItem>
                <Left>
                  <Text>Inkl. Mwst</Text>
                </Left>
                <Right>
                  <Text>{parseFloat(order.mwst).toFixed(2)}€</Text>
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text style={{ fontWeight: "bold" }}>Summe</Text>
                </Left>
                <Right>
                  <Text style={{ fontWeight: "bold" }}>
                    {parseFloat(order.grandTotal).toFixed(2)}€
                  </Text>
                </Right>
              </ListItem>
            </List>
          </Content>
          <LeaveReviewButton restaurant={order.restaurant} />
        </Container>
      );
    }
  }
}

export default OrderOverviewScreen;

interface Props {
  navigation: NavigationScreenProp<any, any>;
  orderID: string;
}

interface State {
  order: any;
  rateRestaurantModalVisible: boolean;
  review: any;
}
