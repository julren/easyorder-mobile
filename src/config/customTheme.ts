const colors = {
  primary: "#008ACD",
  secondary: "#00B851",

  grey0: "#E9E9EF",
  grey1: "#43484d",
  grey2: "#5e6977",
  grey3: "#86939e",
  grey4: "#bdc6cf",
  grey5: "#f9fafb",
  greyOutline: "#cbd2d9"
};

export { colors };

// Theme variables
export default {
  colors: colors,
  Button: {
    color: colors.primary,
    buttonStyle: { padding: 12 }
  },
  Card: {
    containerStyle: {
      marginHorizontal: 0
    }
  },
  ListItem: {
    bottomDivider: true,
    titleStyle: { fontSize: 14 },
    subtitleStyle: { color: colors.grey3, fontSize: 14 }
  },
  Text: {
    style: {
      color: "#282828"
    },
    h1Style: {
      color: "#282828",
      fontSize: 22,
      fontWeight: "700"
    },
    h2Style: {
      fontSize: 18,
      fontWeight: "600",
      color: "#282828"
    },
    h3Style: { fontSize: 16, fontWeight: "500", color: "#282828" },
    h4Style: {
      fontSize: 14,
      fontWeight: "500"
    }
  },
  Input: {
    containerStyle: { paddingVertical: 5 },
    inputContainerStyle: {
      borderWidth: 1,
      borderColor: colors.grey4,
      paddingHorizontal: 8,
      paddingVertical: 4
    },
    leftIconContainerStyle: {
      marginLeft: 0,
      marginRight: 16
    },
    leftIcon: {
      iconStyle: { color: colors.grey3 }
    },
    inputStyle: {
      fontSize: 14
    }
  },
  Icon: {}
};
