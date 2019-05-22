import React, { Component } from "react";
import { View, Text } from "react-native";
import { ThemeConsumer } from "react-native-elements";

interface IProps {
  heading?: string;
  borderTop?: boolean;
  borderBottom?: boolean;
}

class Separator extends Component<IProps> {
  render() {
    const { heading, borderBottom = false, borderTop = false } = this.props;

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <View
            style={{
              height: 35,
              justifyContent: "center",
              paddingHorizontal: 16,
              borderTopWidth: borderTop ? 1 : 0,
              borderBottomWidth: borderBottom ? 1 : 0,
              backgroundColor: theme.colors.grey5,
              borderColor: theme.colors.greyOutline
            }}
          >
            {heading && (
              <Text
                style={{
                  color: theme.colors.grey2,
                  fontSize: 12
                }}
              >
                {heading.toUpperCase()}
              </Text>
            )}
          </View>
        )}
      </ThemeConsumer>
    );
  }
}

export default Separator;
