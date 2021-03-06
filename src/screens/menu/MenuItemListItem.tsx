import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem, Text } from "react-native-elements";
import StarRating from "react-native-star-rating";
import CacheImage from "../../components/basic/CachedImage";
import Row from "../../components/basic/Row";
import withGlobalContext, {
  WithGlobalContextProps
} from "../../contexts/withGlobalContext";
import { MenuItem } from "../../models/MenuItem";

interface IProps extends WithGlobalContextProps {
  menuItem: MenuItem;
  onPress?: () => void;
}

class MenuItemListItem extends PureComponent<IProps> {
  render() {
    const { menuItem, globalContext, ...rest } = this.props;
    const numInCart = globalContext.getNumOfItemInCart(menuItem);

    return (
      <ListItem
        {...rest}
        bottomDivider
        containerStyle={{
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

            <Text h3>{menuItem.name}</Text>
          </View>
        }
        titleStyle={{ fontSize: 16, marginBottom: 4 }}
        subtitle={<LeftElement menuItem={menuItem} />}
        rightAvatar={
          menuItem.photo ? (
            <CacheImage
              source={{ uri: menuItem.photo }}
              style={{ width: 80, height: 80 }}
            />
          ) : null
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
        <StarRating
          containerStyle={{ justifyContent: "flex-start" }}
          maxStars={5}
          rating={menuItem.rating ? menuItem.rating.avgRating : 0}
          halfStarEnabled
          fullStarColor="#F8C533"
          emptyStarColor="#CBCBCB"
          starSize={14}
        />
        <Text style={{ color: "grey", fontSize: 12, marginLeft: 4 }}>
          ({menuItem.rating ? menuItem.rating.totalNumRatings : 0})
        </Text>
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
