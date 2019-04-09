import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";

import { withCartContext, CartContextProps } from "./CartContext";
import { Text, Button, ListItem } from "react-native-elements";
import Container from "../../components/Container";

interface IState {
  selectedPaymentMethod: string;
}

interface IProps extends CartContextProps {
  onClose: () => void;
}

class SelectPaymentModal extends Component<IProps, IState> {
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
    { name: "paypal", icon: "paypal", displayName: "PayPal" },
    { name: "creditcard", icon: "credit-card", displayName: "Kreditkarte" }
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
        <Container
          style={{
            backgroundColor: "#ffff"
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginLeft: 16,
                marginBottom: 8
              }}
            >
              <Text h2 style={{ fontWeight: "bold" }}>
                Bezahlmethode wählen
              </Text>
              <Button title="Fertig" type="clear" onPress={onClose} />
            </View>

            {this.paymentMethods.map((item, index) => (
              <ListItem
                key={item.name}
                title={item.displayName}
                checkmark={
                  this.state.selectedPaymentMethod == item.name ? true : false
                }
                leftIcon={{ type: "font-awesome", name: item.icon }}
                onPress={() => {
                  this.onSelect(item.name);
                }}
              />
            ))}
          </View>
        </Container>
      </View>
    );
  }
}

export default withCartContext(SelectPaymentModal);
