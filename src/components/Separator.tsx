import React, { Component } from "react";
import { View, Text } from "react-native";
import { ThemeConsumer } from "react-native-elements";

class Separator extends Component<IProps> {
  render() {
    const { heading, border = true } = this.props;

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <View
            style={{
              height: 35,
              justifyContent: "center",
              paddingHorizontal: 16,
              borderBottomWidth: border ? 1 : 0,
              backgroundColor: theme.colors.grey5,
              borderColor: theme.colors.greyOutline
            }}
          >
            {heading && (
              <Text style={{ color: theme.colors.grey2, fontSize: 12 }}>
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

interface IProps {
  heading?: string;
  border?: boolean;
}
