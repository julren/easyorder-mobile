import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  Alert,
  ImageBackground,
  KeyboardAvoidingView
} from "react-native";

import { Formik, Field } from "formik";

import { Input, Button, Text, Image, Icon } from "react-native-elements";

import firebase from "../../config/firebase";
import { BrandLogo } from "../../components/BrandLogo";
import { NavigationScreenProp } from "react-navigation";
import Container from "../../components/Container";

export default class LogInScreen extends Component<IProps> {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  navigateToSignUp = () => {
    this.props.navigation.replace("SignUp");
  };

  onSubmit = (values, actions) => {
    const { email, password } = values;
    console.log("trying to login with creds: ", email, password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(resp => {
        console.log("Login sucessfull");
        Keyboard.dismiss();
        actions.setSubmitting(false);
        this.props.navigation.navigate("AuthLoading");
      })
      .catch(error => {
        console.log("Login failed", error);
        actions.setSubmitting(false);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        actions.setErrors(errorCode);
        actions.setStatus({
          msg: "Something went wrong" + errorMessage
        });

        Alert.alert(JSON.stringify(errorMessage, null, 2));
        console.log(error.message);
      });
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#008FCA",
            justifyContent: "center"
          }}
        >
          <BrandLogo
            style={{
              alignSelf: "center",
              color: "#fff"
            }}
          />
        </View>

        <Container padded="more" style={styles.formContainer}>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={this.onSubmit}
          >
            {({ handleChange, handleSubmit, handleBlur, values }) => (
              <View>
                <Field name="email">
                  {({ field }) => (
                    <Input
                      label="Email"
                      placeholder="Email"
                      textContentType="username"
                      rightIcon={<Icon name="person" />}
                      inputContainerStyle={styles.inputContainer}
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                    />
                  )}
                </Field>

                <Field name="password">
                  {({ field }) => (
                    <Input
                      secureTextEntry={true}
                      textContentType="password"
                      label="Passwort"
                      placeholder="Passwort"
                      rightIcon={<Icon name="vpn-key" />}
                      inputContainerStyle={styles.inputContainer}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                    />
                  )}
                </Field>

                <Button title="Login" onPress={(e: any) => handleSubmit(e)} />
              </View>
            )}
          </Formik>
          <Button
            type="clear"
            title="Noch kein Konto? Jetzt registrieren!"
            onPress={this.navigateToSignUp}
            style={{ marginTop: 16 }}
            titleStyle={{ fontSize: 16 }}
          />
          {/* <Button
              title="logout"
              type="clear"
              onPress={() =>
                firebase
                  .auth()
                  .signOut()
                  .then(() => console.log("logoutsuccess"))
              }
              style={{ alignSelf: "center", marginTop: 20 }}
            /> */}
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 2,
    justifyContent: "center",
    alignContent: "center"
  },
  inputContainer: {
    marginBottom: 15
  }
});

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}
