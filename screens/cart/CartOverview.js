import React, { Component } from "react";
import { View } from "react-native";
import {
  Container,
  Text,
  List,
  ListItem,
  Body,
  Right,
  Left,
  Thumbnail,
  Button,
  Icon,
  TouchableOpacity
} from "native-base";
import { CartConsumer } from "./CartContext";

class CartOverview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onCheckout } = this.props;
    return (
      <Container>
        <CartConsumer>
          {({
            cart,
            removeCartItem,
            updateCartItemQuantity,
            calcNumCartItems,
            calcGrandTotal
          }) => (
            <React.Fragment>
              {cart.length > 0 ? (
                <React.Fragment>
                  <List>
                    {cart.map((element, index) => (
                      <ListItem thumbnail key={index}>
                        <Left>
                          <Thumbnail
                            square
                            source={{ uri: element.item.photo }}
                          />
                        </Left>

                        <Body
                          style={{
                            flexDirection: "row",
                            alignItems: "center"
                          }}
                        >
                          <Button icon transparent small>
                            <Icon
                              fontSize="10"
                              type="SimpleLineIcons"
                              name="minus"
                              style={{ marginLeft: 0, marginRight: 0 }}
                            />
                          </Button>
                          <Text style={{ marginRight: 0 }}>
                            {element.quantity}
                          </Text>
                          <Button icon transparent small>
                            <Icon
                              fontSize="10"
                              type="SimpleLineIcons"
                              name="plus"
                              style={{ marginLeft: 0, marginRight: 0 }}
                            />
                          </Button>
                          <Text>{element.item.name}</Text>
                        </Body>
                        <Right>
                          <Text>
                            {parseFloat(
                              element.quantity * element.item.price
                            ).toFixed(2)}
                          </Text>
                        </Right>
                      </ListItem>
                    ))}
                    <ListItem>
                      <Left>
                        <Text style={{ fontWeight: "bold" }}>Summe</Text>
                      </Left>
                      <Right>
                        <Text style={{ fontWeight: "bold" }}>
                          {calcGrandTotal()}
                        </Text>
                      </Right>
                    </ListItem>
                  </List>
                  <Body style={{ marginTop: 10 }}>
                    <Button block onPress={onCheckout}>
                      <Text>Zur Kasse gehen</Text>
                    </Button>
                  </Body>
                </React.Fragment>
              ) : (
                <Text>Warenkorb ist leer</Text>
              )}
            </React.Fragment>
          )}
        </CartConsumer>
      </Container>
    );
  }
}

export default CartOverview;
