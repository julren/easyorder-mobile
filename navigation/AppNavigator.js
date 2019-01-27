import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import AuthNavigator from "./AuthNavigator";
import AuthLoading from "../screens/Auth/AuthLoadingScreen";
import MenuScreen from "../screens/MenuScreen";

export default createAppContainer(
  createSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      AuthLoading: AuthLoading,
      Auth: AuthNavigator,
      App: MainTabNavigator    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
