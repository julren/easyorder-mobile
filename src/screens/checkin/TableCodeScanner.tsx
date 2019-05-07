import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import { firebaseTables } from "../../config/firebase";
import { FirebaseApp } from "@firebase/app-types";
import { Icon, Text } from "react-native-elements";

export interface TableCodeScannerProps {
  onCancel: () => void;
  onScanned: (data) => void;
  withText: boolean;
}

export interface TableCodeScannerState {
  hasCameraPermission: any;
  scannedCode: string;
}

class TableCodeScanner extends Component<
  TableCodeScannerProps,
  TableCodeScannerState
> {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: undefined,
      scannedCode: ""
    };
  }

  async componentDidMount() {
    this.getCameraPermission();
  }

  getCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  getTableDoc = async tableID => {
    return await firebaseTables
      .doc(tableID)
      .get()
      .then(doc => {
        return doc;
      })
      .catch(error => {
        console.log(error);
        return undefined;
      });
  };

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
        {this.props.withText && (
          <Text style={styles.description}>Tischcode scannen</Text>
        )}
        <Icon iconStyle={styles.qr} name="ios-qr-scanner" type="ionicon" />

        <React.Fragment>
          <Text
            style={{
              color: "red",
              position: "absolute",
              top: 150
            }}
            onPress={() =>
              this.handleBarCodeScanned({
                data: "0Fq5H8qxTFnmVl68mpsn",
                type: "test"
              })
            }
          >
            Testwerte
          </Text>

          <Text onPress={onCancel} style={styles.cancel}>
            Abbrechen
          </Text>
        </React.Fragment>
      </BarCodeScanner>
    );
  }

  // Barcode scanner scanns continuesly.
  // Thats why a "already scanned" properity is set in state
  // so that the the data handling isnt repeated multiple times
  handleBarCodeScanned = async ({ data, type }) => {
    this.setState({ scannedCode: data });
    if (this.state.scannedCode !== data) {
      console.log("checking");
      const tableDoc = await this.getTableDoc(data);
      const table = { id: tableDoc.id, ...tableDoc.data() };
      if (tableDoc.exists) {
        this.setState({ scannedCode: "" });
        return this.props.onScanned(table);
      }
    }
  };
}

export default TableCodeScanner;

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
    fontSize: 320
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
