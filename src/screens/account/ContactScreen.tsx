import React, { Component } from "react";
import Container from "../../components/Container";
import { Text, ListItem } from "react-native-elements";
import { ScrollView } from "react-native";
import Separator from "../../components/Separator";

export interface Props {}

export interface State {}

class ContactScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: "Kontakt"
  };

  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ScrollView>
        <Container padded="more">
          <Text h1>Kontakt aufnehmen</Text>
          <Text>Bei Fragen kannst du dich gerne jederzeit an uns wenden</Text>
        </Container>
        <Separator heading="Klassisch" />
        <ListItem title="help@easyorder.com" leftIcon={{ name: "email" }} />
        <ListItem title="0800 123 123 123" leftIcon={{ name: "phone" }} />

        <Separator heading="Social Media" />
        <ListItem
          title="@easyorder"
          leftIcon={{ name: "twitter", type: "material-community" }}
        />
        <ListItem
          title="facebook.com/easyorder"
          leftIcon={{ name: "facebook", type: "material-community" }}
        />
      </ScrollView>
    );
  }
}

export default ContactScreen;
