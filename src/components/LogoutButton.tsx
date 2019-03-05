import React, { Component } from "react";
import { Button, Text } from "native-base";
import { AsyncStorage } from "react-native";
import firebase from "../config/firebase";
import { NavigationScreenProp, withNavigation } from "react-navigation";

class LogoutButton extends Component<Props> {
  logout = () => {
    console.log("logging out");
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("firebase signout successfull");
        this.deleteUserFromStorage();
      })
      .catch(error => {
        console.log(error);
      });
  };

  deleteUserFromStorage = async () => {
    try {
      await AsyncStorage.removeItem("user");
      this.props.navigation.navigate("AuthLoading");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Button
        block
        bordered
        dark
        style={{ marginBottom: 8, marginLeft: 8, marginRight: 8 }}
        onPress={() => this.logout()}
      >
        <Text>Logout</Text>
      </Button>
    );
  }
}

export default withNavigation(LogoutButton);

interface Props {
  navigation: NavigationScreenProp<any, any>;
}
