import React, { Component } from "react";
import { Notifications } from "expo";
import Toast from "react-native-root-toast";
import { EventSubscription } from "fbemitter";

class InAppNotificationProvider extends Component<any, any> {
  notificationSubscription: EventSubscription = undefined;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.notificationSubscription = Notifications.addListener(
      this.handleNotification
    );
  }

  componentWillUnmount() {
    this.notificationSubscription.remove();
  }

  handleNotification = notification => {
    console.log("got notification", notification);

    Toast.show(`🍽 ${notification.data.body}`, {
      duration: Toast.durations.LONG,
      position: Toast.positions.TOP,
      opacity: 1,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0
    });
  };

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

export default InAppNotificationProvider;
