import React, { PureComponent } from "react";
import { Image, View } from "react-native";
import { Button, Text, ThemeConsumer } from "react-native-elements";
import { Table } from "../../models";

interface IProps {
  table: Table;
  onDelete: () => void;
}

class ScannedTableOverlay extends PureComponent<IProps> {
  render() {
    const { onDelete, table } = this.props;

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              paddingHorizontal: 8,
              paddingVertical: 5,
              backgroundColor: theme.colors.primary,
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../../assets/images/tableIcon.png")}
                style={{ height: 20, width: 20, marginRight: 10 }}
                resizeMode="contain"
              />
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                {table.name}
              </Text>
            </View>
            <Button
              onPress={() => onDelete()}
              buttonStyle={{ padding: 5 }}
              icon={{ name: "close", color: "#fff" }}
            />
          </View>
        )}
      </ThemeConsumer>
    );
  }
}

export default ScannedTableOverlay;
