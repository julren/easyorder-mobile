import React, { Component } from "react";
import { Modal, FlatList } from "react-native";
import PropTypes from "prop-types";
import { firebaseMenuItems } from "../../config/firebase";
import AddToCartModal from "./AddToCartModal";

import { ListItem, Text, Image } from "react-native-elements";
import MenuItemListItem from "./MenuItemListItem";

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
        <FlatList
          data={this.state.menuItems}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => (
            <MenuItemListItem
              onPress={() => {
                this.openModal(item);
              }}
              menuItem={item}
            />
          )}
        />

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

      // <React.Fragment>
      //   <List>
      //     {this.state.menuItems.map((item, index) => (
      //       <ListItem
      //         noIndent
      //         thumbnail
      //         key={index}
      //         onPress={() => {
      //           this.openModal(item);
      //         }}
      //       >
      //         <Thumbnail
      //           square
      //           source={{
      //             uri: item.photo
      //           }}
      //         />
      //         <Body>
      //           <Text>{item.name}</Text>
      //           <Text note numberOfLines={1}>
      //             {item.description}
      //           </Text>
      //         </Body>

      //         <Right>
      //           <Text>{parseFloat(item.price).toFixed(2)}€</Text>
      //         </Right>
      //       </ListItem>
      //     ))}
      //   </List>

      //     <Modal
      //       animationType="fade"
      //       transparent={true}
      //       visible={this.state.modalVisible}
      //     >
      //       <AddToCartModal
      //         menuItem={this.state.selectedMenuItem}
      //         onClose={this.closeModal}
      //       />
      //     </Modal>
      //   </React.Fragment>
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
