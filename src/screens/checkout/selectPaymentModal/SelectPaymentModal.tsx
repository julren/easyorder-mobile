import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";

import { GlobalContext } from "../../../contexts/GlobalContext";
import { Text, Button, ListItem, Input, Icon } from "react-native-elements";
import Container from "../../../components/basic/Container";
import withGlobalContext from "../../../contexts/withGlobalContext";
import SelectPaymentForm from "./SelectPaymentForm";
import CreditCardForm from "../../../components/basic/CreditCardForm";
import { PaymentMethod } from "../../../models/PaymentMethod";
import Row from "../../../components/basic/Row";

interface IState {
  selectedPaymentMethod: PaymentMethod;
}

interface IProps {
  globalContext: GlobalContext;
  onClose: (paymentMethod) => void;
}

class SelectPaymentModal extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      selectedPaymentMethod: this.props.globalContext.paymentMethod
    };
  }

  onSelect = paymentMethod => {
    this.setState({ selectedPaymentMethod: paymentMethod });
  };

  onAddCreditCard = creditCardInfo => {
    this.setState({
      selectedPaymentMethod: {
        name: "credit",
        details: creditCardInfo
      }
    });
  };

  render() {
    const { onClose } = this.props;
    const { selectedPaymentMethod } = this.state;

    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={styles.containerStyle}
      >
        <TouchableOpacity
          activeOpacity={0}
          onPress={() => onClose(this.state.selectedPaymentMethod)}
          style={{ flex: 1 }}
        />
        <View style={styles.contentContainerStyle}>
          <Row style={{ justifyContent: "space-between", paddingLeft: 16 }}>
            <Text h3>Zahlungsweise auswählen</Text>
            <Button
              type="clear"
              title="Fertig"
              onPress={() => onClose(this.state.selectedPaymentMethod)}
            />
          </Row>

          <SelectPaymentForm
            selectedPaymentMethod={selectedPaymentMethod}
            onSelect={paymentMethod => this.onSelect(paymentMethod)}
          />

          {/* {selectedPaymentMethod.name === "credit" &&
          !selectedPaymentMethod.details ? (
            <CreditCardForm onSubmit={this.onAddCreditCard} />
          ) : (
            <SelectPaymentForm
              selectedPaymentMethod={selectedPaymentMethod}
              onSelect={paymentMethod => this.onSelect(paymentMethod)}
            />
          )} */}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default withGlobalContext(SelectPaymentModal);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(52, 52, 52, 0.8)"
  },
  contentContainerStyle: {
    backgroundColor: "#fff",
    paddingTop: 8,
    paddingBottom: 32
  }
});
