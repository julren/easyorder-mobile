import React, { Component, ReactChild } from "react";
import { Text, withTheme, ThemeConsumer } from "react-native-elements";

interface IProps {
  style?: any;
}

class TextNote extends Component<IProps> {
  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <Text
            {...this.props}
            style={{
              ...this.props.style,
              color: theme.colors.grey3
            }}
          >
            {this.props.children}
          </Text>
        )}
      </ThemeConsumer>
    );
  }
}

export default TextNote;
