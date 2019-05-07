import React, { PureComponent } from "react";
import { Text } from "react-native-elements";
import { View } from "react-native";

class ErrorMessage extends PureComponent {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text h2>Whoops, etwas ist schiefgelaufen. 😵</Text>
      </View>
    );
  }
}

export default ErrorMessage;
