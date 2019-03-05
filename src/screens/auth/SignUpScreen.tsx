import React, { Component } from "react";
import { View, StyleSheet, Keyboard, Alert } from "react-native";
import {
  Text,
  Content,
  Button,
  Form,
  Item,
  Input,
  Container,
  H2
} from "native-base";
import { Formik, Field } from "formik";

import firebase from "../../config/firebase";
import { BrandLogo } from "../../components/BrandLogo";

import { NavigationScreenProp } from "react-navigation";

export default class SignUpScreen extends Component<IProps> {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  navigateToLogin = () => {
    this.props.navigation.navigate("LogIn");
  };

  render() {
    return (
      <Container>
        <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
          <BrandLogo style={{ alignSelf: "center" }} />
          <Formik
            initialValues={{ email: "", password: "", passwordConfirm: "" }}
            onSubmit={(values, actions) => {
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
                          placeholder="passwort"
                          value={values.password}
                          onChangeText={handleChange("password")}
                          onBlur={handleBlur("password")}
                        />
                      )}
                    </Field>
                  </Item>

                  <Item>
                    <Field name="passwordConfirm">
                      {({ field }) => (
                        <Input
                          secureTextEntry={true}
                          textContentType="password"
                          placeholder="passwort wiederholen"
                          value={values.passwordConfirm}
                          onChangeText={handleChange("passwordConfirm")}
                          onBlur={handleBlur("passwordConfirm")}
                        />
                      )}
                    </Field>
                  </Item>
                </Form>
                <Button
                  block
                  onPress={(e: any) => handleSubmit(e)}
                  style={{ marginTop: 20 }}
                >
                  <Text>Registrieren</Text>
                </Button>
              </View>
            )}
          </Formik>
          <Button
            onPress={this.navigateToLogin}
            transparent
            style={{ alignSelf: "center", marginTop: 20 }}
          >
            <Text>Schon ein Konto? Login!</Text>
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

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}
