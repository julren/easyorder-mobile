import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import {
  Text,
  List,
  ListItem,
  Icon,
  Button,
  Right,
  Left,
  Body,
  Container,
  View,
  H3,
  Content
} from "native-base";
import { withCartContext } from "./CartContext";

class SelectPaymentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPaymentMethod: this.props.cartContext.paymentMethod
    };
  }

  onSelect = paymentMethod => {
    this.setState({ selectedPaymentMethod: paymentMethod });
    const { setPaymentMethod } = this.props.cartContext;
    setPaymentMethod(paymentMethod);
  };

  paymentMethods = [
    { name: "cash", icon: "money", displayName: "Bar" },
    { name: "paypal", icon: "paypal", displayName: "PayPal" }
  ];

  render() {
    const { onClose } = this.props;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(52, 52, 52, 0.8)"
        }}
      >
        <TouchableOpacity
          activeOpacity={0}
          style={{
            flexGrow: 1
          }}
          onPress={onClose}
        />
        <View
          style={{
            backgroundColor: "#ffff",
            paddingTop: 16,
            paddingBottom: 32
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: 16,
                paddingRight: 16,
                paddingBottom: 32
              }}
            >
              <H3 style={{ fontWeight: "bold" }}>Bezahlmethode wählen</H3>
              <Right>
                <Button
                  transparent
                  onPress={onClose}
                  style={{
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingRight: 0,
                    height: 20
                  }}
                >
                  <Text style={{ paddingRight: 0 }}>Fertig</Text>
                </Button>
              </Right>
            </View>

            <List>
              {this.paymentMethods.map((item, index) => (
                <ListItem
                  key={item.name}
                  icon
                  onPress={() => {
                    this.onSelect(item.name);
                  }}
                >
                  <Left>
                    {this.state.selectedPaymentMethod === item.name ? (
                      <Icon type="MaterialIcons" name="check" />
                    ) : (
                      <Icon />
                    )}
                  </Left>
                  <Body>
                    <Text>{item.displayName}</Text>
                  </Body>
                  <Right>
                    <Icon type="FontAwesome" name={item.icon} />
                  </Right>
                </ListItem>
              ))}
            </List>
          </View>
        </View>
      </View>
    );
  }
}

export default withCartContext(SelectPaymentModal);
