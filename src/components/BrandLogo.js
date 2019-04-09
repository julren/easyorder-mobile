import React from "react";
import { Text } from "react-native";
import { Font } from "expo";
import { ThemeConsumer } from "react-native-elements";

export class BrandLogo extends React.Component {
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
