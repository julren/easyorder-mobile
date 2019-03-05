import React, { Component } from "react";
import { View, H3, Icon } from "native-base";
import PropTypes from "prop-types";

export interface Props {
  title: string;
  icon: string;
}

const SectionHeader = ({ title, icon }: Props) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      marginTop: 20,
      marginBottom: 15
    }}
  >
    <Icon
      type="MaterialCommunityIcons"
      name={icon}
      style={{
        marginLeft: 8,
        marginRight: 15,
        fontSize: 20,
        color: "#5BC0EB"
      }}
    />
    <H3 style={{ fontWeight: "500", color: "#5BC0EB" }}>{title}</H3>
  </View>
);

export default SectionHeader;
