import React from "react";
import { View, Button, Icon, Text } from "native-base";

const ScanTableCodeButton = props => (
  <View style={{ margin: 16 }}>
    <Button iconLeft block onPress={props.onPress}>
      <Icon type="MaterialCommunityIcons" name="camera" />

      <Text>Jetzt Tischcode scannen</Text>
    </Button>
    <Text note style={{ marginVertical: 10 }}>
      Bitte scannen Sie den Code auf Ihrem Tisch, damit wir Ihnen Ihre
      Bestellung an den richtigen Platz bringen können.
    </Text>
  </View>
);

export default ScanTableCodeButton;
