import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { GlobalContextConsumer } from "../../contexts/GlobalContext";

interface IProps {
  onPress: () => void;
}

class BuyNowOverlay extends PureComponent<IProps> {
  render() {
    const { onPress } = this.props;

    return (
      <GlobalContextConsumer>
        {({ grandTotal, numCartItems, paymentMethod }) => (
          <Button
            onPress={onPress}
            containerStyle={{ paddingHorizontal: 8, paddingVertical: 16 }}
            title="Jetzt kaufen"
            disabled={paymentMethod.name ? false : true}
          />
        )}
      </GlobalContextConsumer>
    );
  }
}

export default BuyNowOverlay;

const styles = StyleSheet.create({
  text: {
    flex: 0.33,
    color: "#fff",
    fontWeight: "bold"
  }
});
