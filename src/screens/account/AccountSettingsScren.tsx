import React from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Button, Icon, Input, ListItem, Text } from "react-native-elements";
import { TextNote } from "../../components";
import Container from "../../components/basic/Container";
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
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Container>
          <View style={{ padding: 16 }}>
            <Text h1>Passwort ändern</Text>
            <TextNote>Hier kannst du ein neues Passwort angeben</TextNote>
          </View>

          <ListItem
            title={
              <View>
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  leftIcon={
                    <Icon name="vpn-key" iconStyle={{ color: "grey" }} />
                  }
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
                  autoCapitalize="none"
                  autoCorrect={false}
                  leftIcon={
                    <Icon name="vpn-key" iconStyle={{ color: "grey" }} />
                  }
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
              </View>
            }
          />

          {passwordChangeSucces && (
            <Text style={{ color: "green", marginVertical: 10 }}>
              Passwort wurde erfolgreich geändert!
            </Text>
          )}
          <Button
            containerStyle={{ marginHorizontal: 16 }}
            onPress={this.onSubmit}
            title="Speichern"
            disabled={password.length == 0 || !passwordsMatch}
            style={{ marginTop: 18 }}
          />
        </Container>
      </KeyboardAvoidingView>
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
