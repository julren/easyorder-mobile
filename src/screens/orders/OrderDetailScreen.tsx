import React, { PureComponent } from "react";
import { Container, OrderOverview } from "../../components";
import { NavigationScreenProps } from "react-navigation";
import { Text } from "react-native-elements";

interface IProps extends NavigationScreenProps {}

class OrderDetailScreen extends PureComponent<IProps> {
  static navigationOptions = {
    title: "Bestellungsübersicht"
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const order = this.props.navigation.getParam("order", undefined);

    return (
      <Container>
        <OrderOverview order={order} />
      </Container>
    );
  }
}

export default OrderDetailScreen;
