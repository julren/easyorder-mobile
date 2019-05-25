import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { Button, Icon, ListItem, Text } from "react-native-elements";
import { NavigationScreenProps } from "react-navigation";
import Row from "../../components/basic/Row";
import Separator from "../../components/basic/Separator";
import withGlobalContext, {
  WithGlobalContextProps
} from "../../contexts/withGlobalContext";
import CartItemsList from "./CartItemsList";

interface IProps extends NavigationScreenProps<any>, WithGlobalContextProps {}

interface IState {
  paymentModalVisible: boolean;
  barcodeScannerActive: boolean;
}

class CartScreen extends Component<IProps, IState> {
  static navigationOptions = {};

  constructor(props) {
    super(props);
    this.state = {
      paymentModalVisible: false,
      barcodeScannerActive: false
    };
  }

  render() {
    const {
      cart,
      table = { name: "Testtisch 12" },
      paymentMethod,
      numCartItems,
      selectedRestaurant = { name: "Ature" }
    } = this.props.globalContext;

    return (
      <React.Fragment>
        <ScrollView>
          <ListItem
            title={
              <View>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 28,
                    fontWeight: "bold"
                  }}
                >
                  Warenkorb
                </Text>

                <Row>
                  <Icon
                    name="restaurant-menu"
                    containerStyle={{ marginRight: 8 }}
                    iconStyle={{ color: "grey", fontSize: 14 }}
                  />
                  <Text style={{ color: "grey" }}>
                    {selectedRestaurant.name}
                  </Text>
                </Row>
                <Row>
                  <Icon
                    type="material-community"
                    name="alpha-t-box"
                    containerStyle={{ marginRight: 8 }}
                    iconStyle={{ color: "grey", fontSize: 14 }}
                  />
                  <Text style={{ color: "grey" }}>{table.name}</Text>
                </Row>
              </View>
            }
          />

          <Separator heading="Artikel" />

          <CartItemsList />
        </ScrollView>

        <Button
          containerStyle={{ paddingHorizontal: 8, paddingVertical: 16 }}
          title="Zur Kasse"
          disabled={numCartItems <= 0}
          onPress={() => this.props.navigation.navigate("Checkout")}
        />
      </React.Fragment>
    );
  }
}

export default withGlobalContext(CartScreen);
