import React from "react";
import { Text } from "react-native";
import { Font } from "expo";

export class BrandLogo extends React.Component {
  render() {
    return (
      <Text
        style={[
          this.props.style,
          { fontFamily: "Pacifico", fontSize: 56, color: "#2185d0" }
        ]}
      >
        EasyOrder
      </Text>
    );
  }
}
