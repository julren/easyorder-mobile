import React, { Component } from "react";
import { View, Container, Text } from "native-base";
import { DrawerItems } from "react-navigation";
import LogoutButton from "../components/LogoutButton";
import { ThemeConsumer } from "react-native-elements";

class Sidebar extends Component<Props> {
  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <View style={{ flex: 1, paddingBottom: 20 }}>
            <Container>
              <View
                style={{
                  backgroundColor: theme.colors.primary,
                  flex: 0.3,
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    fontFamily: "Pacifico",
                    color: "#fff",
                    fontSize: 30,
                    alignSelf: "center",
                    marginBottom: 1
                  }}
                >
                  EasyOrder
                </Text>
              </View>

              <DrawerItems {...this.props as any} />
            </Container>
            <LogoutButton />
          </View>
        )}
      </ThemeConsumer>
    );
  }
}
export default Sidebar;

interface Props {}
