import React, { PureComponent } from "react";
import { View, ScrollView } from "react-native";

interface IProps {
  tabLabel: string;
  fixedView?: boolean;
}

class Tab extends PureComponent<IProps> {
  render() {
    return (
      <React.Fragment>
        {this.props.fixedView ? (
          // @ts-ignore
          <View tabLabel={this.props.tabLabel} style={{ flex: 1 }}>
            {this.props.children}
          </View>
        ) : (
          // @ts-ignore
          <ScrollView tabLabel={this.props.tabLabel} style={{ flex: 1 }}>
            {this.props.children}
          </ScrollView>
        )}
      </React.Fragment>
    );
  }
}

export default Tab;
