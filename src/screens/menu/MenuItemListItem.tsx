import React, { Component, PureComponent } from "react";
import { ListItem, Text } from "react-native-elements";
import { MenuItem } from "../../models/MenuItem";
import { View, StyleSheet } from "react-native";
import {
  GlobalContextConsumer,
  GlobalContext
} from "../../contexts/GlobalContext";
import withGlobalContext from "../../contexts/withGlobalContext";
import StarRating from "react-native-star-rating";
import CacheImage from "../../components/basic/CachedImage";
import Row from "../../components/basic/Row";

interface IProps {
  globalContext: GlobalContext;
  menuItem: MenuItem;
  onPress?: () => void;
}

class MenuItemListItem extends PureComponent<IProps> {
  render() {
    console.log("rerendered MenuItemListItem");
    const { menuItem, globalContext, ...rest } = this.props;
    const numInCart = globalContext.getNumOfItemInCart(menuItem);

    return (
      <ListItem
        {...rest}
        bottomDivider
        containerStyle={{
          paddingHorizontal: 0,
          ...(numInCart > 0 && {
            borderLeftWidth: 8,
            borderLeftColor: "#008ACD"
          })
        }}
        title={
          <View style={{ marginBottom: 2, flexDirection: "row" }}>
            {numInCart > 0 && (
              <Text
                style={{ fontSize: 16, color: "#008ACD", fontWeight: "bold" }}
              >
                {`${numInCart}x `}
              </Text>
            )}

            <Text style={{ fontSize: 16 }}>{menuItem.name}</Text>
          </View>
        }
        titleStyle={{ fontSize: 16, marginBottom: 4 }}
        subtitle={<LeftElement menuItem={menuItem} />}
        rightAvatar={
          <CacheImage
            source={{ uri: menuItem.photo }}
            style={{ width: 80, height: 80 }}
          />
        }
      />
    );
  }
}

export default withGlobalContext(MenuItemListItem);

const LeftElement = ({ menuItem }) => (
  <View
    style={{
      flex: 1,
      justifyContent: "space-between"
    }}
  >
    <View>
      <Text numberOfLines={2} style={styles.menuItemDesc}>
        {menuItem.description}
      </Text>

      <Row>
        <Text>{menuItem.avgRating}</Text>
        <StarRating
          containerStyle={{ justifyContent: "flex-start" }}
          maxStars={5}
          rating={menuItem.avgRating}
          halfStarEnabled
          fullStarColor="#F8C533"
          emptyStarColor="#CBCBCB"
          starSize={14}
        />
      </Row>
    </View>
    <Text style={styles.menuItemPrice}>{menuItem.price.toFixed(2)}€</Text>
  </View>
);

const styles = StyleSheet.create({
  menuItemHeader: {
    fontSize: 16,
    color: "#323232"
  },
  menuItemDesc: {
    fontSize: 13,
    color: "grey",
    marginBottom: 4
  },
  menuItemPrice: {
    fontSize: 14,
    color: "#323232"
  }
});
