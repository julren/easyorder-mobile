import React, { PureComponent } from "react";
import { Text } from "react-native-elements";
import { View, ViewStyle } from "react-native";

interface IProps {
  containerStyle?: ViewStyle;
}

class ErrorMessage extends PureComponent<IProps> {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          ...this.props.containerStyle
        }}
      >
        <Text h2>Whoops, etwas ist schiefgelaufen. 😵</Text>
      </View>
    );
  }
}

export default ErrorMessage;
