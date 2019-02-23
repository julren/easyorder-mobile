import React, { Component } from "react";
import { Container, Content, Text, Button } from "native-base";

class CheckoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    return (
      <Container>
        <Content>
          <Text>Bestellung abschließen</Text>
          <Button>
            <Text>Jetzt kaufen</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default CheckoutScreen;
