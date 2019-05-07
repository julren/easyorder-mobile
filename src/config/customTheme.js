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
    subtitleStyle: { color: colors.grey3, fontSize: 14 },
    Icon: {
      color: "red"
    }
  },
  Text: {
    h1Style: {
      fontSize: 24,
      fontWeight: "bold"
    },
    h2Style: { fontSize: 21, fontWeight: "bold" },
    h3Style: { fontSize: 18, fontWeight: "bold" }
  },
  Input: {
    containerStyle: { paddingVertical: 5 },
    leftIconContainerStyle: { marginLeft: 0, marginRight: 10 }
  },
  Icon: {}
};
