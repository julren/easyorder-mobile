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
import {
  NavigationEvents,
  NavigationScreenProps,
  NavigationScreenProp
} from "react-navigation";
import MenuItemList from "./MenuItemList";
import MiniCartOverlay from "./MiniCartOverlay";
import { ThemeConsumer, Button, Overlay, Text } from "react-native-elements";

import { MenuSection, MenuItem, Restaurant } from "../../models";
import { Tabs, Tab } from "../../components";
import AddToCartModal from "./addToCartModal/AddToCartModal";
import TableCodeScanner from "../checkin/TableCodeScanner";
import ScanTableCodeModal from "./ScanTableCodeModal";
import withGlobalContext from "../../contexts/withGlobalContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import ScannedTableOverlay from "./ScannedTableOverlay";
import PageLoadingIndicator from "../../components/basic/PageLoadingIndicator";
import { firebaseRestaurants } from "../../config/firebase";

interface IProps {
  navigation: NavigationScreenProp<any>;
  globalContext: GlobalContext;
}

interface IState {
  loading: boolean;
  menuSections: MenuSection[];
  restaurant: Restaurant;
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
      loading: true,
      menuSections: [],
      restaurant: undefined,
      scanTableCodeModalVisible: false,
      selectedMenuItem: undefined
    };
  }

  componentDidMount() {
    let restaurant = this.props.navigation.getParam("restaurant", undefined);
    if (!restaurant) return;
    this.props.globalContext.setSelectedRestaurant(restaurant);

    firebaseRestaurants
      .doc(restaurant.id)
      .collection("menuSections")
      .get()
      .then(querySnapshot => {
        let menuSections = [];

        querySnapshot.forEach(doc => {
          menuSections.push({ id: doc.id, ...doc.data() });
        });

        this.setState({
          loading: false,
          menuSections: menuSections,
          restaurant: restaurant
        });
      });
  }

  closeModal = () => {
    this.setState({
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
    if (this.props.globalContext.table) {
      this.setState({ selectedMenuItem: menuItem });
    } else {
      this.openScanTableCodeModal();
    }
  };

  render() {
    const { selectedMenuItem, menuSections, loading, restaurant } = this.state;
    const { cart, table, resetTable } = this.props.globalContext;

    if (loading) return <PageLoadingIndicator />;
    return (
      <React.Fragment>
        {table != undefined && (
          <ScannedTableOverlay table={table} onDelete={resetTable} />
        )}
        {menuSections.length > 0 ? (
          <Tabs>
            {menuSections.map((category, index) => (
              <Tab tabLabel={category.name} key={category.id}>
                <MenuItemList
                  restaurantID={restaurant.id}
                  menuSectionID={category.id}
                  onItemPress={this.onItemPress}
                />
              </Tab>
            ))}
          </Tabs>
        ) : (
          <Text>(Keine MenuSections gefunden)</Text>
        )}
        <Modal
          animationType="slide"
          transparent={false}
          visible={selectedMenuItem !== undefined}
        >
          <AddToCartModal
            menuItem={selectedMenuItem}
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
          <ScanTableCodeModal onDone={this.closeScanTableCodeModal} />
        </Overlay>

        {cart.length > 0 && (
          <MiniCartOverlay
            onPress={() => {
              this.props.navigation.navigate("Cart");
            }}
          />
        )}
      </React.Fragment>
    );
  }
}

export default withGlobalContext(MenuScreen);
