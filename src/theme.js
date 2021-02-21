import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
// 3. extend the theme
const theme = extendTheme({
  ...config,
  direction: "rtl",
  fonts: {
    body: "'Markazi Text', serif",
  },
  layerStyles: {
  },
  textStyles: {
    nav_item: {
      fontSize: "2xl",
      textColor: "white"
    },
  },
  colors: {
    primary: {
      100: "#FEEBC8",
      200: "#FBD38D",
      300: "#F6AD55",
      400: "#ED8936",
      500: "#ED8936",
      600: "#ED8936",
      700: "#ED8936",
      800: "#7B341E",
      900: "#652B19",
      "white":"white"
    },
    secondary: {
      100: "#E6FFFA",
      200: "#B2F5EA",
      300: "#81E6D9",
      400: "#4FD1C5",
      500: "#38B2AC",
      600: "#2C7A7B",
      700: "#285E61",
      800: "#234E52",
      900: "#1D4044",
      "white":"white"
    }
  }
});
export default theme;
