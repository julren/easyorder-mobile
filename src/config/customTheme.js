const colors = {
  primary: "#03A9F4",
  secondary: "#8F0CE8",

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
    padding: 16
  },
  ListItem: {
    bottomDivider: true,
    titleStyle: { fontSize: 14 },
    subtitleStyle: { color: colors.grey3, fontSize: 14 }
  },
  Text: {
    h1Style: { fontSize: 24 },
    h2Style: { fontSize: 21 },
    h3Style: { fontSize: 18 },
    h4Style: { fontSize: 16 }
  },
  Icon: {
    color: colors.primary
  }
};
