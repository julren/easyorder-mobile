import React, { Component } from "react";
import { View, StatusBar, AsyncStorage, ActivityIndicator } from "react-native";

import firebase from "../../config/firebase";
import { NavigationScreenProp } from "react-navigation";

export default class AuthLoadingScreen extends Component<IProps> {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log("auth change in authloadingscreen");

      if (user != null) {
        const userString = JSON.stringify(user);
        console.log("User signed in: ", user.email);
        AsyncStorage.setItem("user", userString);
        //
        this.props.navigation.navigate("App");
      } else {
        console.log("User is not signed in, redirecting to auth");
        this.props.navigation.navigate("Auth");
      }
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
