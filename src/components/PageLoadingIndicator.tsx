import React, { PureComponent } from "react";
import { View, ActivityIndicator } from "react-native";

class PageLoadingIndicator extends PureComponent {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#008FCA" />
      </View>
    );
  }
}

export default PageLoadingIndicator;
