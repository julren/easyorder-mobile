import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Input, Text, Icon } from "react-native-elements";
import Container from "../../components/Container";
import Separator from "../../components/Separator";
import firebase from "../../config/firebase";

export interface Props {}

export interface State {
  password: string;
  passwordConfim: string;
  validationError: boolean;
  passwordChangeSucces: boolean;
}

class AccountSettingsScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: "Accounteinstellungen"
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      password: "",
      passwordConfim: "",
      validationError: false,
      passwordChangeSucces: false
    };
  }

  onSubmit = () => {
    firebase
      .auth()
      .currentUser.updatePassword(this.state.password)
      .then(() => {
        this.setState({
          passwordChangeSucces: true,
          password: "",
          passwordConfim: ""
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    const { password, passwordConfim, passwordChangeSucces } = this.state;
    const passwordsMatch = password === passwordConfim;
    return (
      <ScrollView>
        <Container padded="more">
          <Text h1>Passwort ändern</Text>
          <Text>Hier kannst du ein neues Passwort angeben</Text>

          <Input
            value={password}
            onChangeText={text => {
              this.setState({ password: text });
            }}
            placeholder="Neues Passwort"
            textContentType="password"
            secureTextEntry={true}
            containerStyle={styles.inputContainer}
          />
          <Input
            value={passwordConfim}
            onChangeText={text => {
              this.setState({ passwordConfim: text });
            }}
            placeholder="Neues Passwort bestätigen"
            textContentType="password"
            secureTextEntry={true}
            containerStyle={styles.inputContainer}
            errorMessage={
              passwordsMatch ? null : "Passwörter stimmen nicht überein"
            }
          />
          {passwordChangeSucces && (
            <Text style={{ color: "green", marginVertical: 10 }}>
              Passwort wurde erfolgreich geändert!
            </Text>
          )}
          <Button
            onPress={this.onSubmit}
            title="Speichern"
            disabled={password.length == 0 || !passwordsMatch}
            style={{ marginTop: 10 }}
          />
        </Container>
      </ScrollView>
    );
  }
}

export default AccountSettingsScreen;

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 0,
    marginVertical: 5
  }
});
