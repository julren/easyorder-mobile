import React, { PureComponent } from "react";
import { Container, OrderOverview } from "../../components";
import { NavigationScreenProps } from "react-navigation";
import { Text } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import CacheImage from "../../components/basic/CachedImage";
import { View } from "react-native";

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
      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 16
          }}
        >
          <CacheImage
            source={{ uri: order.restaurant.logo }}
            style={{ width: 150, height: 150 }}
          />
        </View>
        <OrderOverview order={order} />
      </ScrollView>
    );
  }
}

export default OrderDetailScreen;
