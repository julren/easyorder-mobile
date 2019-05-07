import React, { PureComponent } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { View, StyleSheet } from "react-native";
import {
  Input,
  Icon,
  Button,
  Text,
  ListItem,
  CheckBox
} from "react-native-elements";
import { PaymentMethod } from "../../../models/PaymentMethod";

interface IProps {
  onSelect: (paymentMethod) => void;
  selectedPaymentMethod: PaymentMethod;
}

class SelectPaymentForm extends PureComponent<IProps> {
  render() {
    const { selectedPaymentMethod, onSelect } = this.props;

    return (
      <View>
        <ListItem
          title="Bar"
          checkmark={selectedPaymentMethod.name == "cash" ? true : false}
          leftIcon={{ type: "font-awesome", name: "money" }}
          onPress={() => {
            onSelect({ name: "cash" });
          }}
        />

        <ListItem
          title="PayPal"
          checkmark={selectedPaymentMethod.name == "paypal" ? true : false}
          leftIcon={{ type: "font-awesome", name: "cc-paypal" }}
          onPress={() => {
            onSelect({ name: "paypal" });
          }}
        />

        <ListItem
          title="Kreditkarte"
          // rightIcon={
          //   selectedPaymentMethod.name != "creditcard" &&
          //   !selectedPaymentMethod.details && (
          //     <Icon
          //       type="material-community"
          //       name="plus"
          //       iconStyle={{ fontSize: 20 }}
          //     />
          //   )
          // }
          checkmark={selectedPaymentMethod.name == "creditcard" ? true : false}
          leftIcon={{ type: "font-awesome", name: "credit-card" }}
          onPress={() => {
            onSelect({ name: "creditcard" });
          }}
        />
      </View>
    );
  }
}

export default SelectPaymentForm;
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: 0
  },
  inputContainer: {
    borderWidth: 1,
    paddingHorizontal: 5
  },
  input: {
    fontSize: 12
  }
});
