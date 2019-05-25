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
import * as Yup from "yup";

import { Formik, Field } from "formik";

import firebase, { firebaseUsers } from "../../config/firebase";
import { BrandLogo } from "../../components/basic/BrandLogo";

import Container from "../../components/basic/Container";
import { Button, Input, Icon, Text } from "react-native-elements";
import AuthPageWrapper from "./AuthPageWrapper";
import { Permissions } from "expo";
import { Notifications } from "expo";

const SignupValidationSchema = Yup.object().shape({
  displayName: Yup.string().required("Required"),
  email: Yup.string()
    .email()

    .required("Required"),
  password: Yup.string().required("Required")
});

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

  askForPushPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      alert(
        "Bitte aktivieren Sie Pushbenachrichtigungen in den Einstellungen."
      );
      return null;
    }

    let token = await Notifications.getExpoPushTokenAsync();
    return token;
  };

  setUpPush = async uid => {
    const expoPushToken = await this.askForPushPermission();

    await firebaseUsers.doc(uid).set({ expoPushToken: expoPushToken });
    debugger;
    return firebaseUsers
      .doc(uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          return { id: doc.id, ...doc.data() };
        } else {
          return null;
        }
      });
  };

  onSubmit = (values, actions) => {
    const { email, password, displayName } = values;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async resp => {
        await this.setUpPush(resp.user.uid);
        return resp;
      })
      .then(resp => {
        return resp.user.updateProfile({
          displayName: displayName,
          photoURL: ""
        });
      })
      .then(() => {
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
      <AuthPageWrapper>
        <Text
          h1
          style={{ marginBottom: 36, marginTop: 36 }}
          h1Style={{ fontSize: 36, color: "#008ACD", fontWeight: "bold" }}
        >
          Registrieren
        </Text>

        <Formik
          initialValues={{ email: "", password: "", displayName: "" }}
          validationSchema={SignupValidationSchema}
          onSubmit={this.onSubmit}
        >
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            isValid,
            touched
          }) => (
            <View>
              <Field name="displayName">
                {({ field }) => (
                  <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="name"
                    placeholder="Name"
                    leftIcon={{ name: "person" }}
                    inputContainerStyle={styles.inputContainer}
                    value={values.displayName}
                    onChangeText={handleChange("displayName")}
                    onBlur={handleBlur("displayName")}
                  />
                )}
              </Field>

              <Field name="email">
                {({ field }) => (
                  <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="emailAddress"
                    placeholder="Email"
                    leftIcon={{ name: "email" }}
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
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    placeholder="Passwort"
                    leftIcon={{ name: "vpn-key" }}
                    inputContainerStyle={styles.inputContainer}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                  />
                )}
              </Field>

              <Button
                disabled={
                  touched.displayName &&
                  touched.email &&
                  touched.password &&
                  !isValid
                }
                title="Registrieren"
                onPress={(e: any) => {
                  isValid ? handleSubmit(e) : null;
                }}
                style={{ marginTop: 18 }}
              />
            </View>
          )}
        </Formik>

        <Button
          type="clear"
          title="Schon ein Konto? Login!"
          onPress={this.navigateToLogin}
          style={{ alignSelf: "center", marginTop: 18 }}
          titleStyle={{ fontSize: 16 }}
        />
      </AuthPageWrapper>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 4,
    alignContent: "center"
  },
  inputContainer: {
    marginBottom: 15
  }
});

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}
