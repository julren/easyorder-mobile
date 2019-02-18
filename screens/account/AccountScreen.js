import React from "react";
import { ExpoConfigView } from "@expo/samples";
import { View, AsyncStorage } from "react-native";
import {
  Container,
  Content,
  Text,
  Button,
  List,
  ListItem,
  Icon,
  Left,
  Body,
  Separator
} from "native-base";
import firebase from "app/config/firebase";
import BarcodeScanner from "../../components/BarcodeScanner";

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
    return (
      <Container>
        <Content>
          <List>
            <ListItem avatar>
              <Left>
                <Icon name="person" />
              </Left>
              <Body>
                <Text>{this.state.user.email}</Text>
                <Text note>Ein Benutzer</Text>
              </Body>
            </ListItem>

            <Separator bordered />

            <ListItem
              button
              onPress={() => this.props.navigation.navigate("MyOrders")}
            >
              <Text>Meine Bestellungen</Text>
            </ListItem>
            <ListItem button>
              <Text>Meine Bewertungen</Text>
            </ListItem>
          </List>
          <Separator bordered />

          <ListItem>
            <Body>
              <Button block danger onPress={this.logout}>
                <Text>Logout</Text>
              </Button>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
