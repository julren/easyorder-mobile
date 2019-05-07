import React, { PureComponent } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { View, StyleSheet } from "react-native";
import { Input, Icon, Button, Text, CheckBox } from "react-native-elements";

interface IProps {
  onSubmit: (creditCardInfo) => void;
  intialValues?: any;
}

class CreditCardForm extends PureComponent<IProps> {
  render() {
    const { onSubmit } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Formik
          validationSchema={VerificationSchema}
          initialValues={
            this.props.intialValues
              ? this.props.intialValues
              : {
                  cardHolder: "",
                  cardNumber: "",
                  expires: "",
                  verificationCode: ""
                }
          }
          onSubmit={onSubmit}
        >
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            isValid,
            touched,
            errors,
            setFieldValue
          }) => (
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 8
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold"
                  }}
                >
                  Kreditkarteninfo
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    type="font-awesome"
                    name="cc-visa"
                    color="#7F7F7F"
                    containerStyle={{ marginHorizontal: 4 }}
                  />
                  <Icon
                    type="font-awesome"
                    name="cc-mastercard"
                    color="#7F7F7F"
                  />
                </View>
              </View>

              <Input
                containerStyle={styles.containerStyle}
                value={values.cardHolder}
                onChangeText={handleChange("cardHolder")}
                onBlur={handleBlur("cardHolder")}
                leftIcon={{ name: "person" }}
                rightIcon={
                  touched.cardHolder
                    ? errors.cardHolder
                      ? {
                          name: "cancel",
                          color: "red"
                        }
                      : {
                          name: "check-circle",
                          color: "green"
                        }
                    : null
                }
                placeholder="Karteninhaber"
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
              />
              <Input
                value={values.cardNumber}
                rightIcon={
                  touched.cardNumber
                    ? errors.cardNumber
                      ? {
                          name: "cancel",
                          color: "red"
                        }
                      : {
                          name: "check-circle",
                          color: "green"
                        }
                    : null
                }
                onChangeText={handleChange("cardNumber")}
                onBlur={handleBlur("cardNumber")}
                maxLength={16}
                leftIcon={{ name: "credit-card" }}
                placeholder="Kartennummer"
                textContentType="creditCardNumber"
                keyboardType="number-pad"
                inputContainerStyle={styles.inputContainer}
                containerStyle={styles.containerStyle}
                inputStyle={styles.input}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "space-between"
                }}
              >
                <Input
                  value={values.expires}
                  rightIcon={
                    touched.expires
                      ? errors.expires
                        ? {
                            name: "cancel",
                            color: "red"
                          }
                        : {
                            name: "check-circle",
                            color: "green"
                          }
                      : null
                  }
                  onChangeText={handleChange("expires")}
                  onBlur={handleBlur("expires")}
                  leftIcon={{ name: "date-range" }}
                  placeholder="Gültig bis (01.2021)"
                  maxLength={7}
                  containerStyle={{ ...styles.containerStyle, paddingRight: 4 }}
                  inputContainerStyle={{ ...styles.inputContainer }}
                  inputStyle={styles.input}
                />

                <Input
                  value={values.verificationCode}
                  rightIcon={
                    touched.verificationCode
                      ? errors.verificationCode
                        ? {
                            name: "cancel",
                            color: "red"
                          }
                        : {
                            name: "check-circle",
                            color: "green"
                          }
                      : null
                  }
                  keyboardType="number-pad"
                  onChangeText={handleChange("verificationCode")}
                  onBlur={handleBlur("verificationCode")}
                  leftIcon={{ name: "lock" }}
                  maxLength={4}
                  secureTextEntry
                  placeholder="Prüfnummer"
                  containerStyle={{ ...styles.containerStyle, paddingLeft: 4 }}
                  inputContainerStyle={{ ...styles.inputContainer }}
                  inputStyle={styles.input}
                />
              </View>

              <Button
                disabled={!isValid}
                title="Speichern"
                containerStyle={{ marginVertical: 8 }}
              />
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

export default CreditCardForm;

const VerificationSchema = Yup.object().shape({
  cardHolder: Yup.string().required(),
  cardNumber: Yup.string()
    .matches(/^[0-9]*$/, "Must be a number")
    .max(16)
    .required(),
  expires: Yup.string()
    .min(7)
    .max(7)
    .required(),
  verificationCode: Yup.string()
    .min(3)
    .max(4)
    .required()
});

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    paddingHorizontal: 0
  },
  inputContainer: {
    borderWidth: 1,
    paddingHorizontal: 5
  },
  input: {
    fontSize: 12
  }
});
