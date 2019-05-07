import React, { PureComponent } from "react";

import { FlatList, View } from "react-native";
import { Icon, ListItem, Text } from "react-native-elements";
import { GlobalContextConsumer } from "../../contexts/GlobalContext";
import CacheImage from "../../components/basic/CachedImage";

interface IProps {
  viewOnly?: boolean;
  order?: any;
}

class CartItemsSummaryList extends PureComponent<IProps> {
  render() {
    const { viewOnly = false } = this.props;

    return (
      <GlobalContextConsumer>
        {({ cart, grandTotal, removeCartItem }) => (
          <React.Fragment>
            {cart.map((item, index) => (
              <ListItem
                key={item.item.id}
                bottomDivider
                title={`${item.quantity}x ${item.item.name}`}
                subtitle={item.item.description ? item.item.description : null}
                leftAvatar={{
                  ImageComponent: CacheImage,
                  rounded: false,
                  source: {
                    uri: item.item.photo
                  },
                  size: "medium"
                }}
                rightElement={
                  <Text>{(item.quantity * item.item.price).toFixed(2)}€</Text>
                }
              />
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

export default CartItemsSummaryList;
