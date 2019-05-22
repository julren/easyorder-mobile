import React, { Component } from "react";
import Container from "../../components/basic/Container";
import { Text, ListItem } from "react-native-elements";
import { ScrollView, View } from "react-native";
import CreditCardForm from "../../components/basic/CreditCardForm";
import withGlobalContext, {
  WithGlobalContextProps
} from "../../contexts/withGlobalContext";
import { GlobalContextProps } from "../../contexts/GlobalContextProps";
import { TextNote } from "../../components";
import firebase, { firebaseUsers } from "../../config/firebase";
import { NavigationScreenProps } from "react-navigation";

interface Props extends NavigationScreenProps<any>, WithGlobalContextProps {}

interface State {
  creditCardInfo: any;
}

class CreditCardScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: "Kreditkarte"
  };

  constructor(props: Props) {
    super(props);
    this.state = { creditCardInfo: undefined };
  }

  componentDidMount() {
    this.getCreditCardInfo();
  }

  onSave = creditCardInfo => {
    firebaseUsers
      .doc(firebase.auth().currentUser.uid)
      .set({ creditCardInfo: creditCardInfo });
    this.props.navigation.pop();
  };

  getCreditCardInfo = () => {
    firebaseUsers
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(doc => {
        if (doc.exists && doc.data().creditCardInfo) {
          this.setState({ creditCardInfo: doc.data().creditCardInfo });
        }
      });
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
            title={
              <CreditCardForm
                onSubmit={this.onSave}
                intialValues={this.state.creditCardInfo}
              />
            }
          />
        </Container>
      </ScrollView>
    );
  }
}

export default withGlobalContext(CreditCardScreen);
