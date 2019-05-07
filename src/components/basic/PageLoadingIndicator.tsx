import React, { PureComponent } from "react";
import { View, ActivityIndicator, ViewStyle } from "react-native";

interface IProps {
  style?: ViewStyle;
}

class PageLoadingIndicator extends PureComponent<IProps> {
  render() {
    return (
      <View
        {...this.props}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          ...this.props.style
        }}
      >
        <ActivityIndicator size="large" color="#008FCA" />
      </View>
    );
  }
}

export default PageLoadingIndicator;
