import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import AppNavigator from "./navigation/AppNavigator";
import { CartProvider } from "./screens/cart/CartContext";
import getTheme from "./native-base-theme/components";
import { StyleProvider } from "native-base";
import commonColor from "./native-base-theme/variables/commonColor";

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    const navigationPersistenceKey = __DEV__ ? "ReactNavigationStateDEV" : null;

    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <StyleProvider style={getTheme(commonColor)}>
            <CartProvider>
              <AppNavigator persistenceKey={navigationPersistenceKey} />
            </CartProvider>
          </StyleProvider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([require("./assets/images/welcome-bg.png")]),

      // prettier-ignore
      await Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "OpenSans": require("./assets/fonts/OpenSans-Regular.ttf"),
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        "Pacifico": require("./assets/fonts/Pacifico-Regular.ttf"),
        "Roboto": require("native-base/Fonts/Roboto.ttf"),
        "Roboto_medium": require("native-base/Fonts/Roboto_medium.ttf"),
        "Ionicons": require("@expo/vector-icons/fonts/Ionicons.ttf"),
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0EFF5"
  }
});
