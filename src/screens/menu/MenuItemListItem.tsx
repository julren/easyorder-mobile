import React, { Component, PureComponent } from "react";
import { ListItem, Text } from "react-native-elements";
import { MenuItem } from "../../models/MenuItem";

interface IMenuItemListItem {
  menuItem: MenuItem;
}

class MenuItemListItem extends PureComponent<IMenuItemListItem> {
  render() {
    console.log("rerendered MenuItemListItem");
    const { menuItem } = this.props;

    return (
      <ListItem
        {...this.props}
        bottomDivider
        title={menuItem.name}
        subtitle={menuItem.description ? menuItem.description : null}
        leftAvatar={{
          rounded: false,
          source: {
            uri: menuItem.photo,
            cache: "force-cache"
          },
          size: "medium"
        }}
        rightElement={<Text>{menuItem.price.toFixed(2)}€</Text>}
      />
    );
  }
}

export default MenuItemListItem;
