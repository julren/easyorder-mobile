import React, { Component } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

interface IProps {
  padded?: boolean | "more" | "most";
  style?: ViewStyle;
}

class Container extends Component<IProps> {
  render() {
    const { padded = false, style } = this.props;

    return (
      <View
        style={[
          { flex: 1 },
          padded && { ...styles.padded },
          padded === "more" && { ...styles.morepadded },
          padded === "most" && { ...styles.mostpadded },
          { ...style }
        ]}
      >
        {this.props.children}
      </View>
    );
  }
}

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  padded: {
    padding: 8
  },
  morepadded: {
    padding: 16
  },
  mostpadded: {
    padding: 32
  }
});
