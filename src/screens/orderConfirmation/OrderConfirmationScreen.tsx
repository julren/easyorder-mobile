import React, { Component } from "react";
import { Text, Icon } from "react-native-elements";
import { ImageBackground, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { OrderOverview, Container } from "../../components";
import ErrorMessage from "../../components/basic/ErrorMessage";
import { ScrollView } from "react-native-gesture-handler";

interface IProps extends NavigationScreenProps {}
interface IState {}

class OrderConfirmationScreen extends Component<IProps, IState> {
  static navigationOptions: {
    title: "Bestellübersicht";
    headerLeft: null;
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const order = this.props.navigation.getParam("order");

    if (order === undefined) return <ErrorMessage />;
    return (
      <ScrollView>
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
              type="material-community"
              name="check-circle-outline"
              iconStyle={{ color: "#fff", fontSize: 50 }}
            />
            <Text h2 style={{ color: "#fff" }}>
              Vielen Dank für deine Bestellung!
            </Text>
          </View>
        </ImageBackground>

        <OrderOverview order={order} />
      </ScrollView>
    );
  }
}

export default OrderConfirmationScreen;
