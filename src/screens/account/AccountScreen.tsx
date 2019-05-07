import React, { Component } from "react";
import {
  AsyncStorage,
  StyleSheet,
  ImageBackground,
  View,
  ScrollView
} from "react-native";

import firebase from "../../config/firebase";
import BarcodeScanner from "../../components/BarcodeScanner";
import { NavigationScreenProp } from "react-navigation";
import LogoutButton from "../../components/basic/LogoutButton";
import Container from "../../components/basic/Container";
import { Icon, Text, ListItem } from "react-native-elements";
import Separator from "../../components/basic/Separator";

const restaurantBg = require("../../../assets/images/restaurantbackground.jpg");

export default class AccountScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  static navigationOptions = {
    title: "Account"
  };

  getUserFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        this.setState({ user: JSON.parse(value) });
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getUserFromStorage();
  }

  render() {
    return (
      <ScrollView>
        <ImageBackground
          source={restaurantBg}
          style={{
            height: 200,
            imageStyle: { opacity: 20 }
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(60, 109, 130, 0.7)",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Icon
              name="emoticon-happy"
              type="material-community"
              iconStyle={{ color: "#fff", fontSize: 50 }}
            />
            <Text h1 h1Style={{ color: "#fff", fontWeight: "bold" }}>
              {this.state.user.email}
            </Text>
          </View>
        </ImageBackground>
        <Separator heading="Konto" />
        <ListItem
          leftIcon={{ name: "credit-card", iconStyle: styles.iconColor }}
          title="Kreditkarte"
          rightIcon={{ name: "arrow-forward", iconStyle: styles.iconColor }}
          onPress={() => this.props.navigation.navigate("CreditCard")}
        />
        <ListItem
          leftIcon={{ name: "star", iconStyle: styles.iconColor }}
          title="Meine Bewertungen"
          rightIcon={{ name: "arrow-forward", iconStyle: styles.iconColor }}
          onPress={() => this.props.navigation.navigate("MyReviews")}
        />
        <ListItem
          leftIcon={{ name: "settings", iconStyle: styles.iconColor }}
          title="Einstellungen"
          rightIcon={{ name: "arrow-forward", iconStyle: styles.iconColor }}
          onPress={() => this.props.navigation.navigate("AccountSettings")}
        />
        <Separator heading="Infos & Hilfe" />

        <ListItem
          leftIcon={{ name: "help", iconStyle: styles.iconColor }}
          title="Kontakt aufnehmen"
          rightIcon={{ name: "arrow-forward", iconStyle: styles.iconColor }}
          onPress={() => this.props.navigation.navigate("Contact")}
        />
        <ListItem
          leftIcon={{ name: "info", iconStyle: styles.iconColor }}
          title="Impressum"
          rightIcon={{ name: "arrow-forward", iconStyle: styles.iconColor }}
          onPress={() => this.props.navigation.navigate("Imprint")}
        />
        <ListItem
          leftIcon={{ name: "security", iconStyle: styles.iconColor }}
          title="Datenschutz"
          rightIcon={{ name: "arrow-forward", iconStyle: styles.iconColor }}
          onPress={() => this.props.navigation.navigate("Privacy")}
        />
        <Separator />

        <LogoutButton />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  iconColor: {
    color: "#43484d"
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    backgroundColor: "red"
  }
});

interface Props {
  navigation: NavigationScreenProp<any, any>;
}
interface State {
  user: any;
}
