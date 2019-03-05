import React, { Component, ReactChild } from "react";
import { Text, withTheme } from "react-native-elements";
class TextNote extends Component<IProps> {
  render() {
    return (
      <Text
        {...this.props}
        style={{
          ...this.props.style,
          color: this.props.theme.colors.grey3
        }}
      >
        {this.props.children}
      </Text>
    );
  }
}

export default withTheme(TextNote);

interface IProps {
  style: any;
  children: ReactChild;
  theme: any;
  updateTheme: any;
}
