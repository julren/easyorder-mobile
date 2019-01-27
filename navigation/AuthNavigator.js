import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import LoginScreen from "../screens/Auth/LogInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import WelcomeScreen from "../screens/Auth/WelcomeScreen";

export default createStackNavigator({
  Welcome: WelcomeScreen,
  LogIn: LoginScreen,
  SignUp: SignUpScreen
});
