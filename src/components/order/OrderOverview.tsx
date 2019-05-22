import React, { PureComponent } from "react";
import { View } from "react-native";
import { ListItem, Text } from "react-native-elements";
import { displayNameForOrderStatus } from "../../config/displayNamesForValues";
import { Order } from "../../models/Order";
import ErrorMessage from "../basic/ErrorMessage";
import Separator from "../basic/Separator";
import TextNote from "../basic/TextNote";
import CacheImage from "../basic/CachedImage";
interface IProps {
  order: Order;
}

class OrderOverview extends PureComponent<IProps> {
  constructor(props) {
    super(props);
    this.state = {
      rateRestaurantModalVisible: false,
      review: undefined
    };
  }

  render() {
    const { order } = this.props;
    console.log(order);
    if (!order) {
      return <ErrorMessage />;
    } else {
      return (
        <View>
          <ListItem
            containerStyle={{ borderBottomWidth: 0, paddingVertical: 8 }}
            title={<Text h1>Bestellübersicht</Text>}
          />
          <ListItem
            containerStyle={{ paddingVertical: 0, borderBottomWidth: 0 }}
            title="Bestellnummer"
            rightElement={<TextNote>{order.id}</TextNote>}
          />
          <ListItem
            containerStyle={{ paddingVertical: 0, borderBottomWidth: 0 }}
            title="Bestelldatum"
            rightElement={
              <TextNote>
                {order.orderDate.toLocaleString([], {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </TextNote>
            }
          />
          <ListItem
            containerStyle={{ paddingVertical: 0, borderBottomWidth: 0 }}
            title="Zahlungsart"
            rightElement={<TextNote>{order.paymentMethod.name}</TextNote>}
          />
          <ListItem
            containerStyle={{ paddingVertical: 0, borderBottomWidth: 0 }}
            title="Tischnummer"
            rightElement={
              <TextNote>{order.table ? order.table.name : "2"}</TextNote>
            }
          />
          <ListItem
            containerStyle={{ paddingTop: 0, paddingBottom: 4 }}
            title="Status"
            rightElement={
              <TextNote>{displayNameForOrderStatus[order.status]}</TextNote>
            }
          />

          <Separator heading="Artikel" />
          {order.items.map((item, index) => (
            <ListItem
              key={item.item.id}
              bottomDivider
              title={`${item.quantity}x ${item.item.name}`}
              subtitle={item.item.description ? item.item.description : null}
              leftAvatar={
                <CacheImage
                  source={{
                    uri: item.item.photo
                  }}
                  style={{ width: 40, height: 40 }}
                />
              }
              rightElement={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text>{item.item.price.toFixed(2)}€</Text>
                </View>
              }
            />
          ))}
          <ListItem
            title={
              <Text style={{ fontWeight: "bold" }}>Summe (inkl. Mwst)</Text>
            }
            rightElement={
              <Text style={{ fontWeight: "bold" }}>
                {parseFloat(order.grandTotal).toFixed(2)}€
              </Text>
            }
          />
          {/* 
    
                {order.items.map((element, index) => (
                    <ListItem thumbnail key={index}>
                      <Left>
                        <Thumbnail square source={{ uri: element.item.photo }} />
                      </Left>
                      <Body>
                        <Text>
                          {element.quantity}x {element.item.name}
                        </Text>
                        <Text note numberOfLines={1}>
                          {element.item.description}
                        </Text>
                      </Body>
                      <Right
                        style={{
                          flexDirection: "row",
                          alignItems: "center"
                        }}
                      >
                        <Text>
                          {(element.quantity * element.item.price).toFixed(2)}€
                        </Text>
                      </Right>
                    </ListItem>
                  ))}
    
                  <Separator bordered>
                    <Text>Deine Bestellung</Text>
                  </Separator>
                  {order.items.map((element, index) => (
                    <ListItem thumbnail key={index}>
                      <Left>
                        <Thumbnail square source={{ uri: element.item.photo }} />
                      </Left>
                      <Body>
                        <Text>
                          {element.quantity}x {element.item.name}
                        </Text>
                        <Text note numberOfLines={1}>
                          {element.item.description}
                        </Text>
                      </Body>
                      <Right
                        style={{
                          flexDirection: "row",
                          alignItems: "center"
                        }}
                      >
                        <Text>
                          {(element.quantity * element.item.price).toFixed(2)}€
                        </Text>
                      </Right>
                    </ListItem>
                  ))}
    
                  <ListItem>
                    <Left>
                      <Text>Inkl. Mwst</Text>
                    </Left>
                    <Right>
                      <Text>{parseFloat(order.mwst).toFixed(2)}€</Text>
                    </Right>
                  </ListItem>
                  <ListItem>
                    <Left>
                      <Text style={{ fontWeight: "bold" }}>Summe</Text>
                    </Left>
                    <Right>
                      <Text style={{ fontWeight: "bold" }}>
                        {parseFloat(order.grandTotal).toFixed(2)}€
                      </Text>
                    </Right>
                  </ListItem>
                </List> */}
        </View>
      );
    }
  }
}

export default OrderOverview;
