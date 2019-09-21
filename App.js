import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading } from "expo";
import * as Icon from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import AppNavigator from "./src/navigation/AppNavigator";
import { GlobalContextProvider } from "./src/contexts/GlobalContext";

import { ThemeProvider } from "react-native-elements";
import customTheme from "./src/config/customTheme";
import Constants from "expo-constants";
import { setExpoStatusBarHeight } from "react-navigation-collapsible";
import InAppNotificationProvider from "./src/components/InAppNotificationProvider";

// Needed for react-navigation-collapsible
setExpoStatusBarHeight(Constants.statusBarHeight);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    const navigationPersistenceKey = __DEV__
      ? "ReactNavigationStateDEV117"
      : null;

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
          {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}

          <ThemeProvider theme={customTheme}>
            <InAppNotificationProvider>
              <GlobalContextProvider>
                <AppNavigator />
              </GlobalContextProvider>
            </InAppNotificationProvider>
          </ThemeProvider>
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
        "Pacifico": require("./assets/fonts/Pacifico-Regular.ttf"),
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
    backgroundColor: customTheme.colors.grey5
  }
});
