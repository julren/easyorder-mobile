import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  Alert,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";
import { NavigationScreenProp } from "react-navigation";

import { Formik, Field } from "formik";

import firebase from "../../config/firebase";
import { BrandLogo } from "../../components/BrandLogo";

import Container from "../../components/Container";
import { Button, Input, Icon } from "react-native-elements";

export default class SignUpScreen extends Component<IProps> {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  navigateToLogin = () => {
    this.props.navigation.replace("LogIn");
  };

  onSubmit = (values, actions) => {
    const { email, password } = values;
    console.log("destr", email, password);
    console.log(values);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {
        console.log("ok", resp);
        Keyboard.dismiss();
        actions.setSubmitting(false);
      })
      .catch(error => {
        console.log("fehler", error);
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
      <KeyboardAvoidingView style={{ flex: 1 }}>
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
            initialValues={{ email: "", password: "", passwordConfirm: "" }}
            onSubmit={this.onSubmit}
          >
            {({ handleChange, handleSubmit, handleBlur, values }) => (
              <KeyboardAvoidingView>
                <Field name="email">
                  {({ field }) => (
                    <Input
                      textContentType="username"
                      label="Email"
                      placeholder="Email"
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

                <Field name="passwordConfirm">
                  {({ field }) => (
                    <Input
                      secureTextEntry={true}
                      textContentType="password"
                      label="Passwort wiederholen"
                      placeholder="Passwort wiederholen"
                      rightIcon={<Icon name="vpn-key" />}
                      inputContainerStyle={styles.inputContainer}
                      value={values.passwordConfirm}
                      onChangeText={handleChange("passwordConfirm")}
                      onBlur={handleBlur("passwordConfirm")}
                    />
                  )}
                </Field>

                <Button
                  title="Registrieren"
                  onPress={(e: any) => handleSubmit(e)}
                  style={{ marginTop: 20 }}
                />
              </KeyboardAvoidingView>
            )}
          </Formik>

          <Button
            type="clear"
            title="Schon ein Konto? Login!"
            onPress={this.navigateToLogin}
            style={{ alignSelf: "center", marginTop: 20 }}
            titleStyle={{ fontSize: 16 }}
          />
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
