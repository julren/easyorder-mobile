import React, { Component, PureComponent } from "react";
import {
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ImageBackground,
  StatusBar
} from "react-native";
import { Button, Text, Icon, Input, ListItem } from "react-native-elements";
import StarRating from "react-native-star-rating";

import { MenuItem } from "../../models/MenuItem";
import { GlobalContextConsumer } from "../../contexts/GlobalContext";
import { Container, Tabs, Tab, Separator } from "../../components";
import ReviewRatingDistributionChart from "../../components/rating/ReviewRatingDistributionChart";
import ReviewsList from "../../components/rating/ReviewsList";
import MenuItemListItem from "./MenuItemListItem";

interface IProps {
  onClose: () => void;
  menuItem: MenuItem;
}

class AddToCartModal extends Component<IProps> {
  state = {
    quantity: 1
  };

  componentDidMount() {}

  render() {
    const { onClose, menuItem } = this.props;

    return (
      <React.Fragment>
        <StatusBar hidden />

        <HeaderImage {...this.props} />

        <Tabs>
          <Tab tabLabel="Info" fixedView>
            <MenuItemInfoTab {...this.props} />
          </Tab>

          <Tab tabLabel="Bewertungen" fixedView>
            <MenuItemReviewsTab />
          </Tab>
        </Tabs>
      </React.Fragment>
    );
  }
}

export default AddToCartModal;

class MenuItemInfoTab extends PureComponent<{ menuItem: any; onClose: any }> {
  state = {
    quantity: 1
  };
  render() {
    const { menuItem, onClose } = this.props;
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
                        rating={menuItem.avgRating}
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
                        onClose();
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

class MenuItemReviewsTab extends PureComponent {
  render() {
    return (
      <Container>
        <ReviewRatingDistributionChart
          ratingDistribution={undefined}
          totalNumRatings={undefined}
          totalRatingPoints={undefined}
          avgRating={undefined}
        />
        <Separator borderBottom borderTop heading="Bewertungen" />
        <ReviewsList reviews={undefined} />
      </Container>
    );
  }
}

const HeaderImage = props => (
  <View style={{ backgroundColor: "#000" }}>
    <ImageBackground
      source={{ uri: props.menuItem.photo }}
      style={{
        height: Dimensions.get("window").height / 3
      }}
      imageStyle={{ opacity: 0.8 }}
    >
      <View>
        <View
          style={{
            alignItems: "flex-end",
            paddingHorizontal: 15,
            paddingTop: 15
          }}
        >
          <Icon
            onPress={props.onClose}
            type="material-community"
            name="close-circle-outline"
            iconStyle={{ color: "#fff", fontSize: 36 }}
          />
        </View>
      </View>
    </ImageBackground>
  </View>
);
