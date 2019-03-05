import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  Alert,
  ImageBackground
} from "react-native";
import {
  Text,
  Content,
  Button,
  Form,
  Item,
  Input,
  Body,
  Container,
  Grid,
  Col
} from "native-base";
import { Formik, Field } from "formik";

import firebase from "../../config/firebase";
import { BrandLogo } from "../../components/BrandLogo";
import { NavigationScreenProp } from "react-navigation";

const welcomeBGImg = require("../../../assets/images/welcome-bg.png");

export default class WelcomeScreen extends Component<IProps> {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container>
        <ImageBackground source={welcomeBGImg} style={styles.imageContainer}>
          <View
            style={{
              alignItems: "center",
              flex: 1,
              marginTop: 80
            }}
          >
            <BrandLogo />
          </View>
          <View style={{ flex: 1 }}>
            <Grid>
              <Col>
                <Button
                  large
                  style={{ alignSelf: "center" }}
                  onPress={() => {
                    this.props.navigation.navigate("LogIn");
                  }}
                >
                  <Text>Einloggen</Text>
                </Button>
              </Col>
              <Col>
                <Button
                  large
                  style={{ alignSelf: "center" }}
                  onPress={() => {
                    this.props.navigation.navigate("SignUp");
                  }}
                >
                  <Text>Registrieren</Text>
                </Button>
              </Col>
            </Grid>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
    alignContent: "center",
    height: "100%",
    justifyContent: "center",
    borderColor: "red",
    borderWidth: 1
  },
  contentContainer: {
    flex: 1,
    borderColor: "blue",
    borderWidth: 1,
    // justifyContent: "center",
    alignContent: "center"
  },
  border: {
    borderColor: "green",
    borderWidth: 1
  },
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  }
});

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}
