import React, { Component } from "react";
import { View, StatusBar, AsyncStorage, ActivityIndicator } from "react-native";

import firebase from "../../config/firebase";
import { NavigationScreenProp } from "react-navigation";

export default class AuthLoadingScreen extends Component<IProps> {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log("auth change in authloadingscreen", user);

      this.props.navigation.navigate(user ? "App" : "Auth");
    });
  }

  //   // Fetch the token from storage then navigate to our appropriate place
  //   _bootstrapAsync = async () => {
  //     const user = await AsyncStorage.getItem("user");

  //     // This will switch to the App screen or Auth screen and this loading
  //     // screen will be unmounted and thrown away.
  //     this.props.navigation.navigate(user ? "App" : "Auth");
  //   };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignContent: "center",
          justifyContent: "center"
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }
}
interface IProps {
  navigation: NavigationScreenProp<any, any>;
}
