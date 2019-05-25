import React, { PureComponent } from "react";
import { View, ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationScreenProps } from "react-navigation";
import OrderOverview from "../../components/order/OrderOverview";
import CacheImage from "../../components/basic/CachedImage";

interface IProps extends NavigationScreenProps {}

class OrderDetailScreen extends PureComponent<IProps> {
  static navigationOptions = {
    title: "Bestellübersicht"
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const order = this.props.navigation.getParam("order", undefined);

    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
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
            resizeMode="contain"
          />
        </View>
        <OrderOverview order={order} />
      </ScrollView>
    );
  }
}

export default OrderDetailScreen;
