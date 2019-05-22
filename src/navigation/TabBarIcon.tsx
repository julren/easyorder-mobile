import React from "react";
import { Icon, IconProps } from "react-native-elements";
import { colors } from "../config/customTheme";

export interface Props extends IconProps {
  name: string;
  focused: boolean;
  tintColor: string;
}

class TabBarIcon extends React.Component<Props> {
  render() {
    const { name, focused, tintColor, ...rest } = this.props;
    return (
      <Icon
        size={26}
        containerStyle={{ marginBottom: -3 }}
        name={name}
        iconStyle={{ color: focused ? tintColor : colors.grey3 }}
        {...rest}
      />
    );
  }
}

export default TabBarIcon;
