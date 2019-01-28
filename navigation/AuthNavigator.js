import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import LoginScreen from "../screens/auth/LogInScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import WelcomeScreen from "../screens/auth/WelcomeScreen";

export default createStackNavigator({
  Welcome: WelcomeScreen,
  LogIn: LoginScreen,
  SignUp: SignUpScreen
});
