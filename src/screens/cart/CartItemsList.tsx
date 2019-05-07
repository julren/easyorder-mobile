import React, { PureComponent, Fragment } from "react";

import { FlatList, View, Modal } from "react-native";
import { Icon, ListItem, Text } from "react-native-elements";
import { GlobalContextConsumer } from "../../contexts/GlobalContext";
import CacheImage from "../../components/basic/CachedImage";

interface IProps {
  viewOnly?: boolean;
  order?: any;
}

class CartItemsList extends PureComponent<IProps> {
  render() {
    const { viewOnly = false } = this.props;

    return (
      <GlobalContextConsumer>
        {({
          cart,
          grandTotal,
          removeCartItem,
          increaseCartItemQuantity,
          decreaseCartItemQuantity,
          updateCartItemQuantity
        }) => (
          <React.Fragment>
            {cart.map((cartItem, index) => (
              <React.Fragment key={cartItem.item.id}>
                <ListItem
                  key={cartItem.item.id}
                  bottomDivider
                  title={
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <QuantityPicker
                        style={{ marginRight: 8 }}
                        quantity={cartItem.quantity}
                        onIncrease={() =>
                          increaseCartItemQuantity(cartItem.item)
                        }
                        onDecrease={() =>
                          decreaseCartItemQuantity(cartItem.item)
                        }
                      />
                      <Text>{cartItem.item.name}</Text>
                    </View>
                  }
                  subtitle={
                    cartItem.item.description ? cartItem.item.description : null
                  }
                  leftAvatar={{
                    ImageComponent: CacheImage,
                    rounded: false,
                    source: {
                      uri: cartItem.item.photo
                    },
                    size: "medium"
                  }}
                  rightElement={
                    viewOnly ? null : (
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text>
                          {(cartItem.quantity * cartItem.item.price).toFixed(2)}
                          €
                        </Text>
                      </View>
                    )
                  }
                />
              </React.Fragment>
            ))}

            <ListItem
              title={
                <Text style={{ fontWeight: "bold" }}>Summe (inkl. Mwst)</Text>
              }
              rightElement={
                <Text style={{ fontWeight: "bold" }}>
                  {grandTotal.toFixed(2)}€
                </Text>
              }
            />
          </React.Fragment>
        )}
      </GlobalContextConsumer>
    );
  }
}

export default CartItemsList;

const QuantityPicker = props => {
  const { onIncrease, onDecrease, quantity, ...rest } = props;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        ...props.style
      }}
    >
      <Icon
        type="simple-line-icon"
        name="minus"
        size={20}
        iconStyle={{ marginRight: 8 }}
        onPress={onDecrease}
      />
      <Text style={{ fontSize: 16 }}>{quantity}</Text>

      <Icon
        type="simple-line-icon"
        name="plus"
        size={20}
        iconStyle={{ marginLeft: 8 }}
        onPress={onIncrease}
      />
    </View>
  );
};
