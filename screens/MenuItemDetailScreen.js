import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import { firebaseRestaurants } from "../config/firebase";
import {
  Text,
  Container,
  Form,
  Item,
  Input,
  Header,
  Button,
  Content
} from "native-base";

export default class CartScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "Warenkorb"
  };

  render() {
    return (
      <ScrollView padded>
        <Container>
          <Content>
            <Text>MenuitemDetail</Text>
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
