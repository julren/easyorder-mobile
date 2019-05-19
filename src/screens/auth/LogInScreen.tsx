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
import * as Yup from "yup";

import { Input, Button, Text, Image, Icon } from "react-native-elements";

import firebase, { firebaseUsers } from "../../config/firebase";
import { BrandLogo } from "../../components/basic/BrandLogo";
import { NavigationScreenProp } from "react-navigation";
import Container from "../../components/basic/Container";
import AuthPageWrapper from "./AuthPageWrapper";
import { Permissions } from "expo";
import { Notifications } from "expo";
import withGlobalContext from "../../contexts/withGlobalContext";
import { GlobalContext } from "../../contexts/GlobalContext";

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  globalContext: GlobalContext;
}

class LogInScreen extends Component<IProps> {
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

  setUpPush = async () => {
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

  getUser = async uid => {
    const expoPushToken = await this.setUpPush();

    await firebaseUsers.doc(uid).set({ expoPushToken: expoPushToken });
    debugger;
    return firebaseUsers
      .doc(uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          debugger;
          return { id: doc.id, ...doc.data() };
        } else {
          return null;
        }
      });
  };

  onSubmit = (values, actions) => {
    const { email, password } = values;
    console.log("trying to login with creds: ", email, password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(resp => {
        console.log("Login sucessfull");
        debugger;

        return this.getUser(resp.user.uid);
      })
      .then(user => {
        this.props.globalContext.setUser(user);
        debugger;

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
      <AuthPageWrapper>
        <Text
          h1
          style={{ marginBottom: 36, marginTop: 36 }}
          h1Style={{ fontSize: 36, color: "#008ACD", fontWeight: "bold" }}
        >
          Login
        </Text>

        <Formik
          validationSchema={LoginValidationSchema}
          initialValues={{ email: "", password: "" }}
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
              <Field name="email">
                {({ field }) => (
                  <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Email"
                    textContentType="emailAddress"
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
                disabled={touched.email && touched.password && !isValid}
                title="Login"
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
          title="Noch kein Konto? Jetzt registrieren!"
          onPress={this.navigateToSignUp}
          style={{ marginTop: 18 }}
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
      </AuthPageWrapper>
    );
  }
}

export default withGlobalContext(LogInScreen);

const styles = StyleSheet.create({
  formContainer: {
    flex: 4,
    alignContent: "center"
  },
  inputContainer: {
    marginBottom: 15
  }
});
const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required("Required"),
  password: Yup.string().required("Required")
});
