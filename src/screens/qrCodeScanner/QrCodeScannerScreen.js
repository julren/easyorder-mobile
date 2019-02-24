import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import { Button, Text, Icon } from "native-base";
import { withCartContext } from "../cart/CartContext";

class QrCodeScannerScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    hasCameraPermission: null,
    scannedCode: null
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
      <BarCodeScanner
        onBarCodeScanned={scanned => this.handleBarCodeScanned(scanned)}
        style={[StyleSheet.absoluteFill, styles.container]}
      >
        <Text style={styles.description}>Tischcode scannen</Text>
        <Icon style={styles.qr} name="ios-qr-scanner" />

        <Text
          style={{ color: "red" }}
          onPress={() =>
            this.handleBarCodeScanned({ data: "testvalue", type: "test" })
          }
        >
          Testwerte
        </Text>

        <Text onPress={() => this.props.navigation.pop()} style={styles.cancel}>
          Abbrechen
        </Text>
      </BarCodeScanner>
    );
  }

  // Barcode scanner scanns continuesly.
  // Thats why a "already scanned" properity is set in state
  // so that the the data handling isnt repeated multiple times
  handleBarCodeScanned = ({ data, type }) => {
    if (!this.state.scannedCode) {
      this.setState({ scannedCode: data });
      this.props.cartContext.setTable(data);
      this.props.navigation.navigate("Cart");
    }
  };
}

export default withCartContext(QrCodeScannerScreen);

const { width } = Dimensions.get("window");
const qrSize = width * 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ecf0f1"
  },
  qr: {
    color: "white",
    fontSize: 380,
    marginTop: "10%"
  },
  description: {
    fontSize: width * 0.08,
    textAlign: "center",
    width: "70%",
    color: "white",
    marginTop: "10%"
  },
  cancel: {
    fontSize: width * 0.05,
    textAlign: "center",
    width: "70%",
    color: "white",
    marginBottom: "10%"
  }
});
