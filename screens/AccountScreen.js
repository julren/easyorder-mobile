import React from "react";
import { ExpoConfigView } from "@expo/samples";
import { View, AsyncStorage } from "react-native";
import { Container, Content, Text, Button } from "native-base";
import firebase from "../config/firebase";
import BarcodeScanner from "../components/BarcodeScanner";

export default class AccountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { email: "" }
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

  deleteUserFromStorage = async () => {
    try {
      await AsyncStorage.removeItem("user");
      console.log("user delted");
      this.props.navigation.navigate("AuthLoading");
    } catch (error) {
      console.log(error);
    }
  };

  logout = () => {
    console.log("logging out");
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("logging from firebase success");

        this.deleteUserFromStorage();
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getUserFromStorage();
  }

  render() {
    // /* Go ahead and delete ExpoConfigView and replace it with your
    //  * content, we just wanted to give you a quick view of your config */
    // <ExpoConfigView />
    return (
      <Container>
        <Content padder>
          <Text>{this.state.user.email}</Text>
          <Button block onPress={this.logout}>
            <Text>Logout</Text>

            <BarcodeScanner />
          </Button>
        </Content>
      </Container>
    );
  }
}
