import React, { Component } from "react";
import { AsyncStorage, StyleSheet, ImageBackground } from "react-native";
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
  Separator,
  View,
  H1
} from "native-base";
import firebase from "../../config/firebase";
import BarcodeScanner from "../../components/BarcodeScanner";
import { NavigationScreenProp } from "react-navigation";
import LogoutButton from "../../components/LogoutButton";

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
      <Container>
        <Content>
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
                type="MaterialCommunityIcons"
                style={{ color: "#fff", fontSize: 50 }}
              />
              <H1 style={{ color: "#fff", fontWeight: "bold" }}>
                {this.state.user.email}
              </H1>
            </View>
          </ImageBackground>

          <List>
            <Separator bordered />

            <ListItem
              button
              onPress={() => this.props.navigation.navigate("MyOrders")}
            >
              <Text>Meine Zahlungsdaten</Text>
            </ListItem>
            <ListItem button>
              <Text>Meine Bewertungen</Text>
            </ListItem>
          </List>
          <Separator bordered />

          <LogoutButton />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
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
