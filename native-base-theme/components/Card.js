// @flow

import variable from "./../variables/platform";

export default (variables /*: * */ = variable) => {
  const cardTheme = {
    ".transparent": {
      shadowColor: null,
      shadowOffset: null,
      shadowOpacity: null,
      shadowRadius: null,
      elevation: null,
      backgroundColor: "transparent",
      borderWidth: 0
    },
    ".noShadow": {
      shadowColor: null,
      shadowOffset: null,
      shadowOpacity: null,
      elevation: null
    },
    marginVertical: 5,
    marginHorizontal: 2,
    borderWidth: variables.borderWidth,
    borderRadius: variables.cardBorderRadius,
    borderColor: variables.cardBorderColor,
    flexWrap: "nowrap",
    backgroundColor: variables.cardDefaultBg,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 0.5,
    elevation: 3
  };

  return cardTheme;
};
