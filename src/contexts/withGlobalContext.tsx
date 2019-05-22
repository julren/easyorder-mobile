import React, { Component } from "react";
import { GlobalContextConsumer } from "./GlobalContext";
import { GlobalContextProps } from "./GlobalContextProps";

/**
 * HoC that provides GlobalContext to other Component
 * @param Component: Child Component to wrap in GlobalContext
 */

export interface WithGlobalContextProps {
  globalContext?: GlobalContextProps;
}

const withGlobalContext = <BaseProps extends WithGlobalContextProps>(
  Component: React.ComponentType<BaseProps>
) => {
  class GlobalContextConsumerWrapper extends React.Component<
    BaseProps & WithGlobalContextProps
  > {
    static navigationOptions: any;
    render() {
      const { ...props } = this.props;
      return (
        <GlobalContextConsumer>
          {(globalContext: GlobalContextProps) => (
            <Component {...props as BaseProps} globalContext={globalContext} />
          )}
        </GlobalContextConsumer>
      );
    }
  }
  //@ts-ignore
  GlobalContextConsumerWrapper.navigationOptions = Component.navigationOptions;
  return GlobalContextConsumerWrapper;
};

export default withGlobalContext;
