import React from "react";
import { View } from "react-native";
import { Button, Icon } from "react-native-elements";
import TextNote from "../../components/TextNote";

const ScanTableCodeButton = props => (
  <View style={{ margin: 16 }}>
    <Button
      title="Jetzt Tischcode scannen"
      icon={{
        name: "photo-camera",
        color: "#fff"
      }}
      onPress={props.onPress}
    />
    <TextNote style={{ marginVertical: 10 }}>
      Bitte scannen Sie den Code auf Ihrem Tisch, damit wir Ihnen Ihre
      Bestellung an den richtigen Platz bringen können.
    </TextNote>
  </View>
);

export default ScanTableCodeButton;
