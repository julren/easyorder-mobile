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

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurant: { name: "hi" }
    };
  }

  static navigationOptions = {
    title: "Login"
  };

  componentDidMount() {
    firebaseRestaurants
      .doc("h0segQEKNlVA8rxT9LkK")
      .get()
      .then(doc => {
        console.log("got data ", doc.data());
        this.setState({ restaurant: doc.data() });
      })
      .catch(error => {
        console.error("Error getting document..: ", error);
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Container>
          <Content>
            <Form>
              <Item>
                <Input placeholder="Username" />
              </Item>
              <Item>
                <Input placeholder="Password" />
              </Item>
            </Form>
            <Button
              block
              style={{ margin: 15, marginTop: 50 }}
              onPress={() => {
                console.log("clicked!");
              }}
            >
              <Text>Login</Text>
            </Button>
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
