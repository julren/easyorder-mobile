import React, { Component } from "react";
import { ImageBackground, View } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationActions, NavigationScreenProps } from "react-navigation";
import OrderOverview from "../../components/order/OrderOverview";
import ErrorMessage from "../../components/basic/ErrorMessage";

interface IProps extends NavigationScreenProps {}
interface IState {}

class OrderConfirmationScreen extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Bestellübersicht",
      headerLeft: null,
      headerRight: (
        <Button
          titleStyle={{ color: "#fff" }}
          type="clear"
          title="Fertig"
          onPress={() => {
            navigation.reset([
              NavigationActions.navigate({ routeName: "Restaurants" })
            ]);
          }}
        />
      )
    };
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
              backgroundColor: "rgba(0,0,0, 0.7)",
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
