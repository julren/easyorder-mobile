import React, { Component } from "react";
import Container from "../../components/Container";
import { Text, Icon } from "react-native-elements";
import { ImageBackground, View } from "react-native";
import { Order } from "../../models/Order";

interface IProps {
  order: Order;
}

class OrderConfirmationScreen extends Component<IProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { order } = this.props;

    return (
      <Container>
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
              name="check-bold"
              iconStyle={{ color: "#fff", fontSize: 50 }}
            />
            <Text style={{ color: "#fff" }}>
              Vielen Dank für deine Bestellung!
            </Text>
            <Text h1 style={{ color: "#fff", fontWeight: "bold" }}>
              {order.restaurant.name}
            </Text>
          </View>
        </ImageBackground>

        <Text>Order Confirmation</Text>
      </Container>
    );
  }
}

export default OrderConfirmationScreen;
