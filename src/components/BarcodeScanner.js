import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import { Button, Text } from "native-base";

export default class BarcodeScanner extends React.Component {
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
        <Button onPress={() => onCancel()}>
          <Text>Abbrechen</Text>
        </Button>
        <BarCodeScanner onBarCodeScanned={onScanned} style={{ flex: 0.8 }} />
      </View>
    );
  }

  handleBarCodeScanned = ({ data }) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  }
});
