import React, { PureComponent } from "react";
import { View } from "react-native";
import { Button, Icon, Input, ListItem, Text } from "react-native-elements";
import StarRating from "react-native-star-rating";
import { Container, Separator } from "../../../components";
import { GlobalContextConsumer } from "../../../contexts/GlobalContext";
import { MenuItem } from "../../../models/MenuItem";

interface IProps {
  menuItem: MenuItem;
  onAdded: () => void;
}

interface IState {
  quantity: number;
}

class MenuItemDetailsTab extends PureComponent<IProps, IState> {
  state = {
    quantity: 1
  };
  render() {
    const { menuItem, onAdded } = this.props;
    return (
      <GlobalContextConsumer>
        {({ addCartItem }) => (
          <Container
            style={{
              justifyContent: "space-between",
              backgroundColor: "#f9fafb"
            }}
          >
            <View>
              <ListItem
                title={
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <View>
                      <Text h1 h1Style={{ fontWeight: "normal" }}>
                        {menuItem.name}
                      </Text>
                      <Text style={{ color: "grey" }}>
                        {menuItem.description}
                      </Text>
                      <StarRating
                        containerStyle={{ justifyContent: "flex-start" }}
                        starSize={14}
                        maxStarts={5}
                        rating={menuItem.rating.avgRating}
                        fullStarColor="#FFD700"
                        emptyStarColor="#d3d3d3"
                        disabled
                      />
                    </View>
                    <Text h1 h1Style={{ fontWeight: "normal" }}>
                      {menuItem.price.toFixed(2)}€
                    </Text>
                  </View>
                }
              />
              <Separator borderBottom heading="Anmerkungen" />

              <ListItem
                title={
                  <View>
                    <Input
                      containerStyle={{
                        paddingHorizontal: 0
                      }}
                      inputContainerStyle={{
                        alignItems: "flex-start",
                        padding: 5,
                        paddingBottom: 10,
                        borderWidth: 1,
                        borderColor: "#C9C9C9",
                        borderRadius: 5
                      }}
                      multiline={true}
                      numberOfLines={2}
                      maxLength={100}
                      inputStyle={{
                        fontSize: 14,
                        color: "grey",
                        minHeight: 40
                      }}
                      placeholder="Keine Zwiebeln, ...."
                    />
                  </View>
                }
              />
            </View>

            <View>
              <ListItem
                title={
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingTop: 20,
                        paddingBottom: 20
                      }}
                    >
                      <Icon
                        type="simple-line-icon"
                        name="minus"
                        size={40}
                        iconStyle={{ marginHorizontal: 30, color: "#008ACD" }}
                        onPress={() => {
                          this.state.quantity > 1
                            ? this.setState({
                                quantity: this.state.quantity - 1
                              })
                            : null;
                        }}
                      />
                      <Text style={{ fontSize: 36 }}>
                        {this.state.quantity}
                      </Text>

                      <Icon
                        type="simple-line-icon"
                        name="plus"
                        size={45}
                        iconStyle={{ marginHorizontal: 30, color: "#008ACD" }}
                        onPress={() =>
                          this.setState({
                            quantity: this.state.quantity + 1
                          })
                        }
                      />
                    </View>

                    <Button
                      containerStyle={{ padding: 8 }}
                      buttonStyle={{ padding: 16 }}
                      title="Hinzufügen"
                      onPress={() => {
                        addCartItem(this.props.menuItem, this.state.quantity);
                        onAdded();
                      }}
                    />
                  </View>
                }
              />
            </View>
          </Container>
        )}
      </GlobalContextConsumer>
    );
  }
}

export default MenuItemDetailsTab;
