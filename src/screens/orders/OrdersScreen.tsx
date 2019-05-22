import React, { Component } from "react";
import { FlatList, View } from "react-native";
import { Badge, ListItem, Text } from "react-native-elements";
import { NavigationParams } from "react-navigation";
import Row from "../../components/basic/Row";
import TextNote from "../../components/basic/TextNote";
import { displayNameForOrderStatus } from "../../config/displayNamesForValues";
import firebase, { firebaseOrders } from "../../config/firebase";
import { Order } from "../../models";
import Container from "../../components/basic/Container";
import CacheImage from "../../components/basic/CachedImage";

interface IProps {
  navigation: NavigationParams;
}
interface IState {
  orders: Order[];
  loading: boolean;
}

class OrdersScreen extends Component<IProps, IState> {
  static navigationOptions = {
    title: "Bestellungen"
  };

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      loading: false
    };
  }

  componentDidMount() {
    this.getOrdersOfUser();
  }

  getOrdersOfUser = async () => {
    this.setState({ loading: true });
    try {
      firebaseOrders
        .where("customerID", "==", firebase.auth().currentUser.uid)
        .get()
        .then(querySnapshot => {
          const orders = [];

          querySnapshot.forEach(doc => {
            orders.push({
              ...doc.data(),
              id: doc.id,
              orderDate: doc.data().orderDate.toDate()
            });
          });
          this.setState({ orders: orders.reverse(), loading: false });
        });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  };

  render() {
    const { orders } = this.state;

    return (
      <FlatList
        contentContainerStyle={{ paddingBottom: 32 }}
        data={orders}
        ListHeaderComponent={<ListHeaderComponent />}
        ListEmptyComponent={!this.state.loading && <ListEmptyComponent />}
        keyExtractor={item => item.id}
        onRefresh={() => this.getOrdersOfUser()}
        refreshing={this.state.loading}
        renderItem={({ item }) => (
          <OrderListItem
            order={item}
            onPress={() =>
              this.props.navigation.navigate("OrderDetail", {
                order: item
              })
            }
          />
        )}
      />
    );
  }
}

export default OrdersScreen;

const OrderListItem = ({ order, onPress }) => (
  <ListItem
    key={order.id}
    leftAvatar={
      <CacheImage
        resizeMode="contain"
        source={{ uri: order.restaurant.logo }}
        style={{ width: 40, height: 40 }}
      />
    }
    title={
      <Row>
        <Text>{order.restaurant.name}</Text>
      </Row>
    }
    rightTitle={`${parseFloat(order.grandTotal).toFixed(2)} €`}
    subtitle={
      <View>
        <TextNote>
          {order.orderDate.toLocaleString([], {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
          })}
        </TextNote>
        <Badge
          containerStyle={{ alignSelf: "flex-start" }}
          badgeStyle={{
            backgroundColor: badgeColorForStatus[order.status]
          }}
          value={displayNameForOrderStatus[order.status]}
        />
      </View>
    }
    // subtitle={item.items.map(item => `${item.item.name} | `)}
    onPress={onPress}
  />
);

const ListEmptyComponent = () => (
  <Container padded="more">
    <Text>Keine Bestellungen bisher</Text>
  </Container>
);

const ListHeaderComponent = () => (
  <Container padded="more">
    <Text h1>Meine Bestellungen</Text>
  </Container>
);

const badgeColorForStatus = {
  open: "#3E8ADC",
  inProgress: "#F6AC14",
  readyForServing: "#53C419",
  archived: "#a7a7a7"
};
