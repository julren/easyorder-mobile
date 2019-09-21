import React from "react";
import { Text, ViewStyle } from "react-native";
import * as Font from 'expo-font';
import { ThemeConsumer } from "react-native-elements";

interface IProps {
  style?: ViewStyle;
}

export class BrandLogo extends React.Component<IProps> {
  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <Text
            style={[
              {
                fontFamily: "Pacifico",
                fontSize: 56,
                color: theme.colors.primary
              },
              this.props.style
            ]}
          >
            EasyOrder
          </Text>
        )}
      </ThemeConsumer>
    );
  }
}
