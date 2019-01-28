import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Content,
  Text,
  Button,
  Card,
  CardItem,
  Left,
  Right,
  Body,
  Header,
  Icon,
  Tab,
  Tabs,
  ScrollableTab,
  Thumbnail,
  List,
  ListItem
} from "native-base";
import { firebaseMenuItems } from "../../config/firebase";
import { CartConsumer } from "../cart/CartContext";

class MenuListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: []
    };
  }

  componentDidMount() {
    const { categoryID } = this.props;

    firebaseMenuItems
      .where("categoryID", "==", categoryID)
      .get()
      .then(querySnapshot => {
        let menuItems = [];
        querySnapshot.forEach(doc => {
          menuItems.push(doc.data());
        });
        this.setState({ menuItems: menuItems });
      });
  }

  render() {
    const { onCartAdd } = this.props;
    return (
      <CartConsumer>
        {context => (
          <List>
            {this.state.menuItems.map((item, index) => (
              <ListItem thumbnail key={index}>
                <Left />

                <Thumbnail
                  square
                  source={{
                    uri: item.photo
                  }}
                />
                <Body>
                  <Text>{item.name}</Text>
                  <Text note numberOfLines={1}>
                    {item.desc}
                  </Text>
                </Body>
                <Right>
                  <Button
                    onPress={() => {
                      context.addCartItem(item);
                    }}
                  >
                    <Text>+</Text>
                  </Button>
                </Right>
              </ListItem>
            ))}
          </List>
        )}
      </CartConsumer>
    );
  }
}

export default MenuListItem;

MenuListItem.propTypes = {
  categoryID: PropTypes.string.isRequired
};
