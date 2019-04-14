import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  ThemeConsumer,
  Button,
  Text,
  Icon,
  ThemeProps,
  Theme
} from "react-native-elements";

import { withCartContext, CartContextProps } from "../../contexts/CartContext";
import MenuItemListItem from "./MenuItemListItem";
import { MenuItem } from "../../models/MenuItem";

interface IProps extends ThemeProps<Theme>, CartContextProps {
  onClose: () => void;
  menuItem: MenuItem;
}

class AddToCartModal extends Component<IProps> {
  state = {
    quantity: 1
  };

  componentDidMount() {
    // const itemIndexInCart = this.props.cartContext.cart.findIndex(
    //   element => element.item.id === this.props.menuItem.id
    // );
    // if (itemIndexInCart > 0) {
    //   this.setState({
    //     quantity: this.props.cartContext.cart[itemIndexInCart].quantity
    //   });
    // }
  }

  render() {
    const { onClose } = this.props;
    const { addCartItem } = this.props.cartContext;
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
            paddingTop: 10,
            paddingBottom: 20
          }}
        >
          <Text
            h2
            style={{ fontWeight: "bold", marginLeft: 16, marginVertical: 8 }}
          >
            Zum Warenkorb hinzufügen
          </Text>

          <MenuItemListItem menuItem={this.props.menuItem} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20,
              paddingBottom: 20
            }}
          >
            <Icon
              type="simple-line-icon"
              name="minus"
              size={40}
              iconStyle={{ marginLeft: 15, marginRight: 15 }}
              onPress={() => {
                this.state.quantity > 1
                  ? this.setState({ quantity: this.state.quantity - 1 })
                  : null;
              }}
            />
            <Text style={{ fontSize: 30 }}>{this.state.quantity}</Text>

            <Icon
              type="simple-line-icon"
              name="plus"
              size={45}
              iconStyle={{ marginLeft: 15, marginRight: 15 }}
              onPress={() =>
                this.setState({ quantity: this.state.quantity + 1 })
              }
            />
          </View>

          <Button
            containerStyle={{ padding: 8 }}
            buttonStyle={{ padding: 16 }}
            title="Hinzufügen"
            onPress={() => {
              addCartItem(this.props.menuItem, this.state.quantity);
              onClose();
            }}
          />
        </View>
      </View>
    );
  }
}

export default withCartContext(AddToCartModal);
