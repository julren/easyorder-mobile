import React, { Component, PureComponent } from "react";
import ScrollableTabView from "react-native-scrollable-tab-view";
import {
  withTheme,
  ThemeProps,
  ThemeConsumerProps,
  ThemeConsumer
} from "react-native-elements";

class Tabs extends PureComponent {
  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <ScrollableTabView
            {...this.props}
            tabBarActiveTextColor={theme.colors.primary}
            tabBarTextStyle={{ paddingTop: 10 }}
            tabBarUnderlineStyle={{
              backgroundColor: theme.colors.primary
            }}
          >
            {this.props.children}
          </ScrollableTabView>
        )}
      </ThemeConsumer>
    );
  }
}

export default Tabs;
