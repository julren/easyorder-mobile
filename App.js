import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import AppNavigator from "./src/navigation/AppNavigator";
import { GlobalContextProvider } from "./src/contexts/GlobalContext";

import { ThemeProvider } from "react-native-elements";
import customTheme from "./src/config/customTheme";

import { setExpoStatusBarHeight } from "react-navigation-collapsible";
import { Constants } from "expo";
import InAppNotificationProvider from "./src/components/InAppNotificationProvider";

// Needed for react-navigation-collapsible
setExpoStatusBarHeight(Constants.statusBarHeight);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    const navigationPersistenceKey = __DEV__
      ? "ReactNavigationStateDEV113"
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
                <AppNavigator persistenceKey={navigationPersistenceKey} />
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
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        "Pacifico": require("./assets/fonts/Pacifico-Regular.ttf"),
        "ProximaNova": require("./assets/fonts/Proxima-Nova-Regular.ttf"),
        "ProximaNova_light": require("./assets/fonts/Proxima-Nova-Light.ttf"),
        "ProximaNova_bold": require("./assets/fonts/Proxima-Nova-Bold.ttf"),
        "Roboto": require("./assets/fonts/roboto/Roboto-Regular.ttf"),
        "Roboto-Bold": require("./assets/fonts/roboto/Roboto-Bold.ttf"),
        "Roboto-Medium": require("./assets/fonts/roboto/Roboto-Medium.ttf"),
        "Roboto-Light": require("./assets/fonts/roboto/Roboto-Light.ttf"),
        "Ionicons": require("@expo/vector-icons/fonts/Ionicons.ttf"),       
         "OpenSans": require("./assets/fonts/open-sans/OpenSans-Regular.ttf"),
         "OpenSans-SemiBold": require("./assets/fonts/open-sans/OpenSans-SemiBold.ttf"),
         "OpenSans-Light": require("./assets/fonts/open-sans/OpenSans-Light.ttf"),
         "OpenSans-Bold": require("./assets/fonts/open-sans/OpenSans-Bold.ttf"),



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
