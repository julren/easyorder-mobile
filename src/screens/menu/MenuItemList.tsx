import React, { Component } from "react";
import { Modal, FlatList } from "react-native";
import PropTypes from "prop-types";
import { firebaseMenuItems } from "../../config/firebase";
import AddToCartModal from "./AddToCartModal";

import { ListItem, Text, Image } from "react-native-elements";
import MenuItemListItem from "./MenuItemListItem";
import { MenuItem } from "../../models/MenuItem";
import { GlobalContext } from "../../contexts/GlobalContext";
import withGlobalContext from "../../contexts/withGlobalContext";
import PageLoadingIndicator from "../../components/basic/PageLoadingIndicator";

interface IProps {
  categoryID: string;
  onItemPress: (item: MenuItem) => void;
}

interface IState {
  loading: boolean;
  menuItems: MenuItem[];
  modalVisible: boolean;
  selectedMenuItem: MenuItem;
}

class MenuItemList extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      menuItems: [],
      modalVisible: false,
      selectedMenuItem: placeHolderMenuItem
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
          menuItems.push({ id: doc.id, ...doc.data() });
        });
        this.setState({ loading: false, menuItems: menuItems });
      });
  }

  render() {
    const { onItemPress } = this.props;
    const { menuItems, loading } = this.state;
    if (loading) return <PageLoadingIndicator style={{ marginTop: 10 }} />;
    return (
      <React.Fragment>
        <FlatList
          data={menuItems}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => (
            <MenuItemListItem
              onPress={() => onItemPress(item)}
              menuItem={item}
            />
          )}
        />
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

export default MenuItemList;

const placeHolderMenuItem: MenuItem = {
  name: "",
  description: "",
  price: 0,
  photo: "",
  categoryID: "",
  authorID: ""
};
