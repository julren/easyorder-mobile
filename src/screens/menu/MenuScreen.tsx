import React, { PureComponent } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Modal,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";
import { NavigationEvents, NavigationScreenProps } from "react-navigation";
import { firebaseMenuCategories } from "../../config/firebase";
import MenuItemList from "./MenuItemList";
import {
  CartConsumer,
  withCartContext,
  CartContext
} from "../../contexts/CartContext";
import MiniCartOverlay from "./MiniCartOverlay";
import { ThemeConsumer, Button, Overlay, Text } from "react-native-elements";

import { Category, MenuItem } from "../../models";
import { Tabs, Tab } from "../../components";
import AddToCartModal from "./AddToCartModal";
import TableCodeScanner from "../checkin/TableCodeScanner";
import ScanTableCodeModal from "./ScanTableCodeModal";
interface IProps extends NavigationScreenProps {
  cartContext: CartContext;
}

interface IState {
  categories: Category[];
  addToCartModalVisible: boolean;
  scanTableCodeModalVisible: boolean;
  selectedMenuItem: MenuItem;
}

class MenuScreen extends PureComponent<IProps, IState> {
  static navigationOptions = ({ navigation }) => {
    const restaurant = navigation.getParam("restaurant", undefined);

    return {
      title: "Speisekarte",
      headerRight: (
        <Button
          icon={{ name: "info", color: "#fff", size: 20 }}
          type="clear"
          onPress={() =>
            navigation.navigate("RestaurantDetail", {
              restaurant: restaurant
            })
          }
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      addToCartModalVisible: false,
      scanTableCodeModalVisible: false,
      selectedMenuItem: undefined
    };
  }

  componentDidMount() {
    let restaurant = this.props.navigation.getParam("restaurant", undefined);
    if (!restaurant) return;

    const cartContext = this.props.cartContext;
    cartContext.setRestaurant(restaurant);

    firebaseMenuCategories
      .where("authorID", "==", restaurant.id)
      .get()
      .then(querySnapshot => {
        let categories = [];

        querySnapshot.forEach(doc => {
          categories.push({ id: doc.id, ...doc.data() });
        });

        this.setState({ categories: categories });
      });
  }

  openModal = selectedMenuItem => {
    this.setState({
      addToCartModalVisible: true,
      selectedMenuItem: selectedMenuItem
    });
  };

  closeModal = () => {
    this.setState({
      addToCartModalVisible: false,
      selectedMenuItem: undefined
    });
  };

  openScanTableCodeModal = () => {
    this.setState({ scanTableCodeModalVisible: true });
  };

  closeScanTableCodeModal = () => {
    this.setState({ scanTableCodeModalVisible: false });
  };

  onItemPress = menuItem => {
    if (this.props.cartContext.table) {
      this.setState({ selectedMenuItem: menuItem });
    } else {
      this.openScanTableCodeModal();
    }
  };

  render() {
    const { addToCartModalVisible } = this.state;
    const { cart, table } = this.props.cartContext;
    return (
      <React.Fragment>
        <Tabs>
          {this.state.categories.map((category, index) => (
            <Tab tabLabel={category.name} key={category.id}>
              <MenuItemList
                categoryID={category.id}
                onItemPress={this.onItemPress}
              />
            </Tab>
          ))}
        </Tabs>
        <Modal
          animationType="fade"
          transparent={true}
          visible={addToCartModalVisible}
        >
          <AddToCartModal
            menuItem={this.state.selectedMenuItem}
            onClose={this.closeModal}
          />
        </Modal>
        <Overlay
          borderRadius={5}
          width={Dimensions.get("window").width - 40}
          overlayStyle={{ padding: 20 }}
          windowBackgroundColor="rgba(0,0,0, .5)"
          isVisible={this.state.scanTableCodeModalVisible}
          onBackdropPress={this.closeScanTableCodeModal}
          height="auto"
        >
          <ScanTableCodeModal />
        </Overlay>

        {cart.length > 0 && (
          <MiniCartOverlay
            onPress={() => {
              this.props.navigation.navigate("Cart");
            }}
          />
        )}
        {table && <Text>{table.name}</Text>}
      </React.Fragment>
    );
  }
}

export default withCartContext(MenuScreen);
