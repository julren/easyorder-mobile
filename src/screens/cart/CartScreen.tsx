import React, { Component } from "react";
import { Modal, ScrollView, View, StyleSheet } from "react-native";

import { GlobalContext } from "../../contexts/GlobalContext";
import Separator from "../../components/basic/Separator";
import { NavigationScreenProp, NavigationScreenProps } from "react-navigation";
import { Text, ListItem, Button, Icon } from "react-native-elements";
import withGlobalContext from "../../contexts/withGlobalContext";
import { Constants } from "expo";
import CartItemsList from "./CartItemsList";
import Row from "../../components/basic/Row";

interface IProps {
  navigation: NavigationScreenProp<any>;
  globalContext: GlobalContext;
}

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
          onPress={() => this.props.navigation.navigate("Checkout")}
        />
      </React.Fragment>
    );
  }
}

export default withGlobalContext(CartScreen);
