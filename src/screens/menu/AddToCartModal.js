import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import {
  View,
  Text,
  Button,
  Body,
  Icon,
  Left,
  Right,
  Thumbnail,
  ListItem,
  Content,
  H2
} from "native-base";
import { withCartContext } from "../cart/CartContext";

class AddToCartModal extends Component {
  state = {
    quantity: 1
  };

  render() {
    const { menuItem, onClose } = this.props;
    const { name, price, description, photo, photoThumb } = menuItem;
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
          <ListItem thumbnail>
            <Left />

            <Thumbnail
              square
              source={{
                uri: photo
              }}
            />
            <Body>
              <Text>{name}</Text>
              <Text note numberOfLines={1}>
                {description}
              </Text>
            </Body>

            <Right>
              <Text>{parseFloat(price).toFixed(2)}€</Text>
            </Right>
          </ListItem>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20,
              paddingBottom: 20
            }}
          >
            <Button
              large
              icon
              transparent
              onPress={() => {
                this.state.quantity > 1
                  ? this.setState({ quantity: this.state.quantity - 1 })
                  : null;
              }}
            >
              <Icon
                type="SimpleLineIcons"
                name="minus"
                style={{ marginLeft: 10, marginRight: 10, fontSize: 35 }}
              />
            </Button>
            <H2>{this.state.quantity}</H2>

            <Button
              large
              big
              icon
              transparent
              onPress={() =>
                this.setState({ quantity: this.state.quantity + 1 })
              }
            >
              <Icon
                type="SimpleLineIcons"
                name="plus"
                style={{ marginLeft: 10, marginRight: 10, fontSize: 35 }}
              />
            </Button>
          </View>

          <View padder>
            <Button
              block
              onPress={() => {
                addCartItem(menuItem, this.state.quantity);
                onClose();
              }}
            >
              <Text>Hinzufügen</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export default withCartContext(AddToCartModal);
