import React, { Component } from "react";
import { Text, Icon } from "react-native-elements";
import { ImageBackground, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { OrderOverview, Container } from "../../components";

interface IProps extends NavigationScreenProps {}
interface IState {}

class OrderConfirmationScreen extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { order } = this.props.navigation.getParam("order", undefined);

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

        <OrderOverview order={order} />
      </Container>
    );
  }
}

export default OrderConfirmationScreen;
