import React, { PureComponent } from "react";
import { Order } from "../../models/Order";
import { NavigationScreenProps } from "react-navigation";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { ListItem, Text, Image } from "react-native-elements";
import Separator from "../basic/Separator";
import ErrorMessage from "../basic/ErrorMessage";
import TextNote from "../basic/TextNote";
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
          <ListItem title={<Text h1>Bestellübersicht</Text>} />
          <ListItem
            title="Bestellnummer"
            rightElement={<TextNote>{order.orderID}</TextNote>}
          />
          <ListItem
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
            title="Zahlungsart"
            rightElement={<TextNote>{order.paymentMethod.name}</TextNote>}
          />
          <ListItem
            title="Tischnummer"
            rightElement={
              <TextNote>{order.table ? order.table.name : "2"}</TextNote>
            }
          />
          {/* <ListItem
            title="Status"
            rightElement={<TextNote>{order.status}</TextNote>}
          /> */}

          <Separator heading="Artikel" />
          {order.items.map((item, index) => (
            <ListItem
              key={item.item.id}
              bottomDivider
              title={`${item.quantity}x ${item.item.name}`}
              subtitle={item.item.description ? item.item.description : null}
              leftAvatar={{
                rounded: false,
                source: {
                  uri: item.item.photo
                },
                size: "medium"
              }}
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
