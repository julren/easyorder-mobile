import React, { Component } from "react";
import { Dimensions, ImageBackground, StatusBar, View } from "react-native";
import { Icon } from "react-native-elements";
import { MenuItem } from "../../../models/MenuItem";
import MenuItemDetailsTab from "./MenuItemDetailsTab";
import MenuItemReviewsTab from "./MenuItemReviewsTab";
import Tabs from "../../../components/basic/Tabs";
import Tab from "../../../components/basic/Tab";

interface IProps {
  onClose: () => void;
  menuItem: MenuItem;
}

class AddToCartModal extends Component<IProps> {
  state = {
    quantity: 1
  };

  componentDidMount() {}

  render() {
    const { onClose, menuItem } = this.props;

    return (
      <React.Fragment>
        <StatusBar hidden />

        <View>
          <ImageBackground
            source={{ uri: menuItem.photo }}
            style={{
              height: Dimensions.get("window").height / 3
            }}
          >
            <View>
              <View
                style={{
                  alignItems: "flex-end",
                  paddingHorizontal: 15,
                  paddingTop: 15
                }}
              >
                <Icon
                  onPress={onClose}
                  type="material-community"
                  name="close-circle-outline"
                  iconStyle={{ color: "#fff", fontSize: 36 }}
                />
              </View>
            </View>
          </ImageBackground>
        </View>

        <Tabs>
          <Tab tabLabel="Info" fixedView>
            <MenuItemDetailsTab menuItem={menuItem} onAdded={onClose} />
          </Tab>

          <Tab tabLabel="Bewertungen" fixedView>
            <MenuItemReviewsTab menuItem={menuItem} />
          </Tab>
        </Tabs>
      </React.Fragment>
    );
  }
}

export default AddToCartModal;
