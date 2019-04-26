import React, { PureComponent } from "react";
import { Text, Image, Button } from "react-native-elements";
import { View } from "react-native";
import TableCodeScanner from "../checkin/TableCodeScanner";
import { NavigationScreenProps } from "react-navigation";

interface IProps extends NavigationScreenProps {}

interface IState {
  scanActive: boolean;
}

class ScanTableCodeModal extends PureComponent<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      scanActive: false
    };
  }

  onActivateScan = () => {
    this.setState({ scanActive: true });
  };

  onCancelScan = () => {
    this.setState({ scanActive: false });
  };

  render() {
    const { scanActive } = this.state;
    return (
      <View>
        <Text h1 style={{ marginBottom: 10 }}>
          Tischcode scannen
        </Text>
        <Text style={{ marginBottom: 10 }}>
          Bitte scannen Sie den QR-Code auf dem Tischaufsteller, um mit Ihrer
          Bestellung zu beginnen.
        </Text>

        {scanActive ? (
          <View>
            <View style={{ height: 300 }}>
              <TableCodeScanner
                withText={false}
                onScanned={() => console.log("scanned")}
                onCancel={() => console.log("cancel")}
              />
            </View>
            <Button
              onPress={this.onCancelScan}
              icon={{
                name: "close-circle",
                type: "material-community",
                color: "#fff"
              }}
              title="Abbrechen"
            />
          </View>
        ) : (
          <View>
            <Image
              source={require("../../../assets/images/scanqr.gif")}
              style={{ width: "auto" }}
            />

            <Button
              onPress={this.onActivateScan}
              icon={{
                name: "qrcode-scan",
                type: "material-community",
                color: "#fff"
              }}
              title="Code scannen"
            />
          </View>
        )}
      </View>
    );
  }
}

export default ScanTableCodeModal;
