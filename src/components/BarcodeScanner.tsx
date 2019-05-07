import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import { Button, Text } from "react-native-elements";

export default class BarcodeScanner extends Component<Props> {
  static navigationOptions = {
    header: null
  };

  state = {
    hasCameraPermission: null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    const { hasCameraPermission } = this.state;
    const { onCancel, onScanned } = this.props;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={styles.container}>
        <Button title="Abbrechen" onPress={() => onCancel()} />

        <BarCodeScanner onBarCodeScanned={onScanned} style={{ flex: 0.8 }} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  }
});

interface Props {
  onCancel: Function;
  onScanned: Function;
}
