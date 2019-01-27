import React from "react";
import { Image, Platform, ScrollView, StyleSheet, View } from "react-native";
import {
  Container,
  Content,
  Text,
  Button,
  Card,
  CardItem,
  Left,
  Right,
  Body,
  Header,
  Icon,
  Tab,
  Tabs,
  ScrollableTab,
  Thumbnail,
  List,
  ListItem
} from "native-base";
import { firebaseRestaurants } from "../config/firebase";

export default class MenuScreen extends React.Component {
  static navigationOptions = {
    title: "Speisekarte"
  };

  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      testarray: new Array(10),
      menu: {
        title: "Speisekarte",
        author: "",
        content: [
          {
            sectionTitle: "Vorspeisen",
            sectionItems: [
              {
                name: "Salat",
                price: 8
              },
              {
                name: "suppe",
                price: 5
              },
              {
                name: "Brot",
                price: 6
              }
            ]
          },
          {
            sectionTitle: "Hauptspeisen",
            sectionItems: [
              {
                name: "pizza",
                price: 8
              },
              {
                name: "pasta",
                price: 5
              }
            ]
          }
        ]
      }
    };
  }

  handleCartAdd = item => {
    const newCardContents = this.state.cart;
    newCardContents.push(item);

    console.log(newCardContents);
    this.setState({ cart: newCardContents });
  };

  render() {
    return (
      <Container>
        <Tabs renderTabBar={() => <ScrollableTab />}>
          <Tab heading="Vorsepise">
            <Content>
              <List>
                {[...Array(20)].map((_, index) => (
                  <ListItem thumbnail key={index}>
                    <Left />

                    <Thumbnail
                      square
                      source={{
                        uri:
                          "https://lieferapps.de//site/assets/files/17090/pizza-1344720_640.256x256.jpg"
                      }}
                    />
                    <Body>
                      <Text>Pizza Funghi</Text>
                      <Text note numberOfLines={1}>
                        Champignons, Käse, Basilikum
                      </Text>
                    </Body>
                    <Right>
                      <Button
                        onPress={() => {
                          this.handleCartAdd("pizza");
                        }}
                      >
                        <Text>+</Text>
                      </Button>
                    </Right>
                  </ListItem>
                ))}
              </List>
            </Content>
          </Tab>
          <Tab heading="Pizza">
            <Text>Zeug</Text>
          </Tab>
          <Tab heading="Pasta">
            <Text>Zeug</Text>
          </Tab>
          <Tab heading="Vegetarisch">
            <Text>Zeug</Text>
          </Tab>
          <Tab heading="Dessert">
            <Text>Zeug</Text>
          </Tab>
        </Tabs>
        {this.state.cart.length > 0 ? <Cart cart={this.state.cart} /> : null}
      </Container>
    );
  }
}

const Cart = props => {
  return (
    <View
      style={{
        justifyContent: "center",
        backgroundColor: "#2185d0",
        height: 50,
        padding: 10
      }}
    >
      <Text style={{ color: "white" }}>Cart {props.cart.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
