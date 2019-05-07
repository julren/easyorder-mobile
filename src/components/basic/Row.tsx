import React, { Component, ReactChildren, ReactNode } from "react";
import { View, ViewStyle } from "react-native";

interface IProps {
  children: ReactNode;
  style?: ViewStyle;
}

class Row extends Component<IProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          ...this.props.style
        }}
      >
        {this.props.children}
      </View>
    );
  }
}

export default Row;
