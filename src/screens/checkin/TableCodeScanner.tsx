import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Expo from "expo";
import React, { Component } from "react";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import { Icon, Text } from "react-native-elements";
import { firebaseRestaurants } from "../../config/firebase";
import { QrCodeData } from "../../models/QrCodeData";

export interface TableCodeScannerProps {
  onCancel: () => void;
  onScanned: (data) => void;
  withText: boolean;
}

export interface TableCodeScannerState {
  hasCameraPermission: any;
  scannedCode: string;
  loading: boolean;
}

class TableCodeScanner extends Component<
  TableCodeScannerProps,
  TableCodeScannerState
> {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: undefined,
      scannedCode: "",
      loading: false
    };
  }

  async componentDidMount() {
    this.getCameraPermission();
  }

  getCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  checkCode = async tableCode => {
    try {
      const { restaurantId, tableId }: QrCodeData = JSON.parse(tableCode);
      const restaurantDoc = await this.getRestaurantDoc(restaurantId);
      const tableDoc = await this.getTableDoc(restaurantDoc, tableId);
      return { tableDoc: tableDoc, restaurantDoc: restaurantDoc };
    } catch (error) {
      console.log(error);
      throw new Error("Code scan failed.");
    }
  };

  getRestaurantDoc = async restaurantId => {
    return firebaseRestaurants
      .doc(restaurantId)
      .get()
      .then(doc => {
        if (doc.exists) {
          return doc;
        } else {
          throw new Error(
            "Restaurant with ID " + restaurantId + " does not exist."
          );
        }
      });
  };

  getTableDoc = async (restaurantDoc, tableId) => {
    return restaurantDoc.ref
      .collection("tables")
      .doc(tableId)
      .get()
      .then(doc => {
        return doc;
      })
      .catch(error => {
        console.log(error);
        throw new Error(
          "Table with ID " +
            tableId +
            " in Restaurant with ID " +
            restaurantDoc.id +
            " does not exist."
        );
      });
  };

  render() {
    const { hasCameraPermission, loading } = this.state;
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
        {loading && (
          <ActivityIndicator
            size="large"
            color="white"
            style={{
              position: "absolute",
              top: 150
            }}
          />
        )}
        <React.Fragment>
          <Text
            style={{
              color: "white",
              opacity: 5,
              position: "absolute",
              top: 150
            }}
            onPress={() =>
              this.handleBarCodeScanned({
                data: `{"restaurantId":"3rY6g0zLuaNi3j61dUu0XTa6okY2","restaurantName":"Tigerlilly Supperclub","tableId":"944vNxPkRBx4ZgVusOAE","tableName":"Tisch 4"}`,
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
      this.setState({ loading: true });
      console.log("checking qr code: ", data);

      try {
        const result = await this.checkCode(data);
        this.setState({ scannedCode: "", loading: false });
        return this.props.onScanned(result);
      } catch (error) {
        console.log(error);
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
    fontSize: width * 0.07,
    textAlign: "center",
    width: "70%",
    color: "white",
    marginTop: "15%"
  },
  cancel: {
    fontSize: width * 0.05,
    textAlign: "center",
    width: "70%",
    color: "white",
    marginBottom: "10%"
  }
});
