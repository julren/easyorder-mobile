import React, { Component } from "react";
import { Modal } from "react-native";
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
  View,
  ListItem
} from "native-base";
import { firebaseMenuItems } from "../../config/firebase";
import { CartConsumer } from "../cart/CartContext";
import AddToCartModal from "./AddToCartModal";

class MenuListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],
      modalVisible: false,
      selectedMenuItem: placeHolderMenuItem
    };
  }

  openModal = selectedMenuItem => {
    this.setState({ modalVisible: true, selectedMenuItem: selectedMenuItem });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
      selectedMenuItem: placeHolderMenuItem
    });
  };

  componentDidMount() {
    const { categoryID } = this.props;

    firebaseMenuItems
      .where("categoryID", "==", categoryID)
      .get()
      .then(querySnapshot => {
        let menuItems = [];
        querySnapshot.forEach(doc => {
          menuItems.push({ id: doc.id, ...doc.data() });
        });
        this.setState({ menuItems: menuItems });
      });
  }

  render() {
    return (
      <React.Fragment>
        <List>
          {this.state.menuItems.map((item, index) => (
            <ListItem
              thumbnail
              key={index}
              onPress={() => {
                this.openModal(item);
              }}
            >
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
                  {item.description}
                </Text>
              </Body>

              <Right>
                <Text>{parseFloat(item.price).toFixed(2)}€</Text>
              </Right>
            </ListItem>
          ))}
        </List>

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <AddToCartModal
            menuItem={this.state.selectedMenuItem}
            onClose={this.closeModal}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default MenuListItem;

MenuListItem.propTypes = {
  categoryID: PropTypes.string.isRequired
};

const placeHolderMenuItem = {
  name: "",
  description: "",
  price: 0,
  photo: "",
  photoThumb: "",
  categoryID: "",
  authorID: ""
};
