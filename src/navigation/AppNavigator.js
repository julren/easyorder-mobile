import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

import MainDrawerNavigator from "./MainDrawerNavigator";
import AuthNavigator from "./AuthNavigator";
import AuthLoading from "../screens/auth/AuthLoadingScreen";

export default createAppContainer(
  createSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      AuthLoading: AuthLoading,
      Auth: AuthNavigator,
      App: MainDrawerNavigator
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
