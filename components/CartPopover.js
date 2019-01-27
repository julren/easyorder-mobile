import React, { Component } from "react";
import {
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Container
} from "native-base";

class CardPopOverWrapper extends Component {
  state = {
    items: ["hallo"]
  };
  render() {
    return (
      <Container>
        {this.props.children}
        <Footer>
          <FooterTab>
            <Button full>
              {this.state.items.map((item, index) => {
                <Text key={index}>{this.state.item}</Text>;
              })}
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default CardPopOverWrapper;
