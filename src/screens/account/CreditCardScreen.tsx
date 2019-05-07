import React, { Component } from "react";
import Container from "../../components/basic/Container";
import { Text, ListItem } from "react-native-elements";
import { ScrollView, View } from "react-native";
import CreditCardForm from "../../components/basic/CreditCardForm";
import withGlobalContext from "../../contexts/withGlobalContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import { TextNote } from "../../components";

export interface Props {
  globalContext: GlobalContext;
}

export interface State {}

class CreditCardScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: "Kreditkarte"
  };

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  onSave = creditCardInfo => {
    console.log("saved", creditCardInfo);
  };

  render() {
    return (
      <ScrollView>
        <Container>
          <View style={{ padding: 16 }}>
            <Text h1>Kreditkarte bearbeiten</Text>
            <TextNote>Hier kannst du deine Kreditkarte bearbeiten</TextNote>
          </View>
          <ListItem
            containerStyle={{ padding: 0 }}
            title={<CreditCardForm onSubmit={this.onSave} />}
          />
        </Container>
      </ScrollView>
    );
  }
}

export default withGlobalContext(CreditCardScreen);
