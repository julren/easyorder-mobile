import React, { PureComponent } from "react";
import { View } from "react-native";

interface IProps {
  tabLabel: string;
}

class Tab extends PureComponent<IProps> {
  render() {
    return <View>{this.props.children}</View>;
  }
}

export default Tab;
