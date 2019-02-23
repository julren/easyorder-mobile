import React, { Component } from "react";
import { View, StyleSheet, Keyboard, Alert } from "react-native";
import {
  Text,
  Content,
  Button,
  Form,
  Item,
  Input,
  Container
} from "native-base";
import { Formik, Field } from "formik";

import firebase from "../../config/firebase";
import { BrandLogo } from "../../components/BrandLogo";

export default class LogInScreen extends Component {
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
    this.props.navigation.navigate("SignUp");
  };

  render() {
    return (
      <Container>
        <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
          <BrandLogo style={{ alignSelf: "center" }} />

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, actions) => {
              const { email, password } = values;
              console.log("trying to login with creds: ", email, password);
              firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(resp => {
                  console.log("Login sucessfull");
                  Keyboard.dismiss();
                  actions.setSubmitting(false);
                  this.props.navigation.navigate("AuthLoadingScreen");
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
            }}
          >
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              values,
              setFieldValue
            }) => (
              <View>
                <Form>
                  <Item>
                    <Field name="email">
                      {({ field }) => (
                        <Input
                          textContentType="username"
                          placeholder="email"
                          value={values.email}
                          onChangeText={handleChange("email")}
                          onBlur={handleBlur("email")}
                        />
                      )}
                    </Field>
                  </Item>

                  <Item>
                    <Field name="password">
                      {({ field }) => (
                        <Input
                          secureTextEntry={true}
                          textContentType="password"
                          placeholder="password"
                          value={values.password}
                          onChangeText={handleChange("password")}
                          onBlur={handleBlur("password")}
                        />
                      )}
                    </Field>
                  </Item>
                </Form>
                <Button block onPress={handleSubmit} style={{ marginTop: 20 }}>
                  <Text>Login</Text>
                </Button>
              </View>
            )}
          </Formik>
          <Button
            onPress={this.navigateToSignUp}
            transparent
            style={{ alignSelf: "center", marginTop: 20 }}
          >
            <Text>Noch kein Konto? Jetzt registrieren!</Text>
          </Button>
          <Button
            onPress={() => firebase.auth().signOut()}
            transparent
            style={{ alignSelf: "center", marginTop: 20 }}
          >
            <Text>logout</Text>
          </Button>
        </View>
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
    justifyContent: "center"
  },
  contentContainer: {
    flex: 1,
    // justifyContent: "center",
    alignContent: "center"
  },
  border: {
    borderColor: "green",
    borderWidth: 1
  }
});
