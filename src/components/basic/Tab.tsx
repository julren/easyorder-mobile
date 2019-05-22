import React, { PureComponent } from "react";
import { View, ScrollView, ViewStyle } from "react-native";

interface IProps {
  tabLabel: string;
  fixedView?: boolean;
  style?: ViewStyle;
}

class Tab extends PureComponent<IProps> {
  render() {
    const { fixedView, style, tabLabel, children } = this.props;
    return (
      <React.Fragment>
        {fixedView ? (
          // @ts-ignore
          <View tabLabel={tabLabel} style={{ flex: 1, ...style }}>
            {children}
          </View>
        ) : (
          // @ts-ignore
          <ScrollView tabLabel={tabLabel} style={{ flex: 1, ...style }}>
            {children}
          </ScrollView>
        )}
      </React.Fragment>
    );
  }
}

export default Tab;
