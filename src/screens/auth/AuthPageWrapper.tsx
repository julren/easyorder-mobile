import React, { PureComponent } from "react";
import { StyleSheet, KeyboardAvoidingView, View } from "react-native";
import { BrandLogo } from "../../components/basic/BrandLogo";
import Container from "../../components/basic/Container";

const AuthPageWrapper = props => (
  <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
    <View
      style={{
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#008FCA",
        justifyContent: "center"
      }}
    >
      <BrandLogo
        style={{
          alignSelf: "center",
          color: "#fff"
        }}
      />
    </View>

    <Container padded="more" style={styles.formContainer}>
      {props.children}
    </Container>
  </KeyboardAvoidingView>
);

export default AuthPageWrapper;

const styles = StyleSheet.create({
  formContainer: {
    flex: 3,
    alignContent: "center"
  }
});
