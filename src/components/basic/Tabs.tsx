import React, { Component, PureComponent } from "react";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { ThemeConsumer } from "react-native-elements";

class Tabs extends PureComponent {
  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <ScrollableTabView
            {...this.props}
            prerenderingSiblingsNumber={1}
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
