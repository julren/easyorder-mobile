import React, { Component } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import { ThemeConsumer, Text, Icon } from "react-native-elements";
import { GlobalContextConsumer } from "../../contexts/GlobalContext";

interface IProps {
  onPress: () => void;
}

interface IState {}

class MiniCartOverlay extends Component<IProps, IState> {
  render() {
    const { onPress } = this.props;

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <GlobalContextConsumer>
            {({ grandTotal, numCartItems }) => (
              <TouchableOpacity style={styles.container} onPress={onPress}>
                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: theme.colors.primary,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flex: 1,
                    paddingHorizontal: 16
                  }}
                >
                  <View style={{ flex: 0.2 }}>
                    <View
                      style={{
                        backgroundColor: "#00537B",
                        width: 20,
                        padding: 3,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text
                        style={{
                          ...styles.text
                        }}
                      >
                        {numCartItems}
                      </Text>
                    </View>
                  </View>

                  <View style={{ flex: 0.6 }}>
                    <Text style={{ textAlign: "center", ...styles.text }}>
                      Warenkorb anzeigen
                    </Text>
                  </View>

                  <View style={{ flex: 0.2 }}>
                    <Text style={{ textAlign: "right", ...styles.text }}>
                      {grandTotal.toFixed(2)} €
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </GlobalContextConsumer>
        )}
      </ThemeConsumer>
    );
  }
}

export default MiniCartOverlay;

const styles = StyleSheet.create({
  container: {
    height: 55,
    marginHorizontal: 8,
    marginVertical: 8
  },
  contentContainer: {},
  text: { color: "#fff", fontWeight: "bold" }
});
