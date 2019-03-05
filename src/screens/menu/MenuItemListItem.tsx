import React, { Component } from "react";
import { ListItem, Text } from "react-native-elements";

class MenuItemListItem extends Component<IMenuItemListItem> {
  render() {
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
            uri: menuItem.photo
          },
          size: "medium"
        }}
        rightElement={<Text>{parseFloat(menuItem.price).toFixed(2)}€</Text>}
      />
    );
  }
}

export default MenuItemListItem;

interface IMenuItemListItem {
  menuItem: any;
}
