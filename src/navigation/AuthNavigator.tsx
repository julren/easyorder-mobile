import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "../screens/auth/LogInScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";

export default createStackNavigator({
  LogIn: LoginScreen,
  SignUp: SignUpScreen
});
