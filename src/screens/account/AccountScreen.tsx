import React, { Component } from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import { Icon, ListItem, Text } from "react-native-elements";
import { NavigationScreenProp } from "react-navigation";
import LogoutButton from "../../components/basic/LogoutButton";
import Separator from "../../components/basic/Separator";
import firebase from "../../config/firebase";

const restaurantBg = require("../../../assets/images/restaurant-bg-tigerlilly.jpg");

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

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user });
      }
    });
  }

  render() {
    const { user } = this.state;
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
            <Text style={{ fontSize: 45 }}>😋</Text>
            <Text h1 h1Style={{ color: "#fff", fontWeight: "bold" }}>
              {user.displayName ? user.displayName : user.email}
            </Text>
            <Text h2 h2Style={{ color: "#fff" }}>
              {user.email}
            </Text>
          </View>
        </ImageBackground>
        <Separator heading="Konto" />
        <ListItem
          leftIcon={{ name: "credit-card", iconStyle: styles.iconStyle }}
          title="Kreditkarte"
          rightIcon={{ name: "arrow-forward", iconStyle: styles.iconStyle }}
          onPress={() => this.props.navigation.navigate("CreditCard")}
        />
        <ListItem
          leftIcon={{ name: "star", iconStyle: styles.iconStyle }}
          title="Meine Bewertungen"
          rightIcon={{ name: "arrow-forward", iconStyle: styles.iconStyle }}
          onPress={() => this.props.navigation.navigate("MyReviews")}
        />
        <ListItem
          leftIcon={{ name: "settings", iconStyle: styles.iconStyle }}
          title="Einstellungen"
          rightIcon={{ name: "arrow-forward", iconStyle: styles.iconStyle }}
          onPress={() => this.props.navigation.navigate("AccountSettings")}
        />
        <Separator heading="Infos & Hilfe" />

        <ListItem
          leftIcon={{ name: "help", iconStyle: styles.iconStyle }}
          title="Kontakt aufnehmen"
          rightIcon={{ name: "arrow-forward", iconStyle: styles.iconStyle }}
          onPress={() => this.props.navigation.navigate("Contact")}
        />
        <ListItem
          leftIcon={{ name: "info", iconStyle: styles.iconStyle }}
          title="Impressum"
          rightIcon={{ name: "arrow-forward", iconStyle: styles.iconStyle }}
          onPress={() => this.props.navigation.navigate("Imprint")}
        />
        <ListItem
          leftIcon={{ name: "security", iconStyle: styles.iconStyle }}
          title="Datenschutz"
          rightIcon={{ name: "arrow-forward", iconStyle: styles.iconStyle }}
          onPress={() => this.props.navigation.navigate("Privacy")}
        />
        <Separator />

        <LogoutButton />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  iconStyle: {
    color: "#282828"
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
