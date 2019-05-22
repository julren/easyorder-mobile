import React, { PureComponent } from "react";
import { View } from "react-native";
import { Button, Image, Text } from "react-native-elements";
import withGlobalContext, {
  WithGlobalContextProps
} from "../../contexts/withGlobalContext";
import TableCodeScanner from "../checkin/TableCodeScanner";
import CheckmarkAnimation from "./CheckmarkAnimation";
import TextNote from "../../components/basic/TextNote";

interface IProps extends WithGlobalContextProps {
  onDone: () => void;
}

interface IState {
  scanActive: boolean;
  scanSuccess: boolean;
  loading: boolean;
}

class ScanTableCodeModal extends PureComponent<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      scanActive: false,
      scanSuccess: false,
      loading: false
    };
  }

  onActivateScan = () => {
    this.setState({ scanActive: true });
  };

  onCancelScan = () => {
    this.setState({ scanActive: false });
  };

  onScanSuccess = result => {
    const { restaurantDoc, tableDoc } = result;
    this.props.globalContext.setTable({ id: tableDoc.id, ...tableDoc.data() });
    this.props.globalContext.setSelectedRestaurant({
      id: restaurantDoc.id,
      ...restaurantDoc.data()
    });
    this.setState({ scanActive: false, scanSuccess: true });

    // Wait 2 seconds for the success animation to finish
    setTimeout(() => {
      this.props.onDone();
    }, 2000);
  };

  render() {
    const { scanActive, scanSuccess, loading } = this.state;
    const { setTable, table, selectedRestaurant } = this.props.globalContext;
    const { onDone } = this.props;
    return (
      <View>
        {scanSuccess ? (
          <View>
            <Text
              style={{
                color: "#008ACD",
                fontWeight: "bold",
                alignSelf: "center"
              }}
            >
              {selectedRestaurant.name}
            </Text>

            <CheckmarkAnimation
              style={{
                height: 250,
                width: "100%"
              }}
            />
            <Text
              style={{
                color: "#008ACD",
                fontWeight: "bold",
                alignSelf: "center"
              }}
            >
              {table.name}
            </Text>
          </View>
        ) : (
          <View>
            <Text h1 style={{ marginBottom: 10 }}>
              Tischcode scannen
            </Text>
            <TextNote style={{ marginBottom: 10 }}>
              Bitte scannen Sie den QR-Code auf dem Tischaufsteller, um mit
              Ihrer Bestellung zu beginnen.
            </TextNote>

            {scanActive ? (
              <View>
                <View style={{ height: 300 }}>
                  <TableCodeScanner
                    withText={false}
                    onScanned={table => {
                      this.onScanSuccess(table);
                    }}
                    onCancel={() => console.log("cancel")}
                  />
                </View>
                <Button
                  style={{ marginTop: 10 }}
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
              <React.Fragment>
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
              </React.Fragment>
            )}
          </View>
        )}
      </View>
    );
  }
}

export default withGlobalContext(ScanTableCodeModal);
