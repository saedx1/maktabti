import { extendTheme } from "@chakra-ui/react";
import Cookies from "js-cookie";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
// 3. extend the theme
const availableColors = {
  darkBlue: {
    // dark blue - incomplete
    100: "#e6e6ff",
    200: "#b3b3f5",
    300: "#8181e6",
    400: "#4f4fd1",
    500: "#3737b3",
    600: "#2c2c7a",
    700: "#282861",
    800: "#232352",
    900: "#1e1e45",
    white: "white",
  },
  orange: {
    // orange
    100: "#fff0e6",
    200: "#f5ceb3",
    300: "#e6ab81",
    400: "#d1854f",
    500: "#b36b37",
    600: "#7a4d2c",
    700: "#614028",
    800: "#523623",
    900: "#452e1e",
    white: "white",
  },
  red: {
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
  blue: {
    // blue
    100: "#E6FFFA",
    200: "#B2F5EA",
    300: "#81E6D9",
    400: "#4FD1C5",
    500: "#38B2AC",
    600: "#2C7A7B",
    700: "#285E61",
    800: "#234E52",
    900: "#1D4044",
    white: "white",
  },
  purple: {
    // purple
    100: "#f2e6ff",
    200: "#d4b3f5",
    300: "#b381e6",
    400: "#904fd1",
    500: "#7537b3",
    600: "#532c7a",
    700: "#442861",
    800: "#3a2352",
    900: "#311e45",
    white: "white",
  },
  yellow: {
    // yellow
    100: "#ffffe6",
    200: "#f5f5b3",
    300: "#e6e681",
    400: "#d1d14f",
    500: "#b3b337",
    600: "#b3b337",
    700: "#616128",
    800: "#525223",
    900: "#45451e",
    white: "white",
  },
};
let colors = {
  primary: { ...availableColors.blue },
};
LoadCookie();
let theme = extendTheme({
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

export function SwitchColors(color) {
  Cookies.set("color", color);
}

function LoadCookie() {
  let color = Cookies.get("color");
  console.log(color);
  if (color) {
    colors = { primary: availableColors[color] };
  }
}

export default theme;
