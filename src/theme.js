import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
// 3. extend the theme
const colors = {
  // primary: { // dark blue - incomplete
  //   100: "white",
  //   200: "#64B7FA",
  //   300: "#64B7FA",
  //   400: "#64B7FA",
  //   500: "#03144B",
  //   600: "#03144B",
  //   700: "#03144B",
  //   800: "#03144B",
  //   900: "#03144B",
  //   white: "white",
  // },
  // primary: { // orange - incomplete
  //   100: "#FEEBC8",
  //   200: "#FBD38D",
  //   300: "#F6AD55",
  //   400: "#ED8936",
  //   500: "#ED8936",
  //   600: "#ED8936",
  //   700: "#ED8936",
  //   800: "#7B341E",
  //   900: "#652B19",
  //   white: "white",
  // },
  primary: {
    // red
    100: "#ffe6e6",
    200: "#f5b2b2",
    300: "#e68181",
    400: "#d14f4f",
    500: "#b23838",
    600: "#7b2c2c",
    700: "#612828",
    800: "#522323",
    900: "#441d1d",
    white: "white",
  },
  // primary: { // blue
  //   100: "#E6FFFA",
  //   200: "#B2F5EA",
  //   300: "#81E6D9",
  //   400: "#4FD1C5",
  //   500: "#38B2AC",
  //   600: "#2C7A7B",
  //   700: "#285E61",
  //   800: "#234E52",
  //   900: "#1D4044",
  //   white: "white",
  // },
  // primary: { // purple
  //   100: "#f2e6ff",
  //   200: "#d4b3f5",
  //   300: "#b381e6",
  //   400: "#904fd1",
  //   500: "#7537b3",
  //   600: "#532c7a",
  //   700: "#442861",
  //   800: "#3a2352",
  //   900: "#311e45",
  //   white: "white",
  // },
  // primary: { // yellow
  //   100: "#ffffe6",
  //   200: "#f5f5b3",
  //   300: "#e6e681",
  //   400: "#d1d14f",
  //   500: "#b3b337",
  //   600: "#b3b337",
  //   700: "#616128",
  //   800: "#525223",
  //   900: "#45451e",
  //   white: "white",
  // },
};
const theme = extendTheme({
  ...config,
  colors,
  direction: "rtl",
  fonts: {
    body: "'Markazi Text', serif",
  },
  layerStyles: {},
  textStyles: {
    nav_item: {
      fontSize: "2xl",
      textColor: "white",
      _hover: {
        textColor: colors.primary[500],
      },
    },
  },
});
export default theme;
