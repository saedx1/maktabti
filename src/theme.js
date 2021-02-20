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
    navBar: {
      bg: "yellow.400",
      color: "gray.600",
    },
  },
  textStyles: {
    nav_item: {
      fontSize: "30px",
      fontWeight: "bold",
      lineHeight: "110%",
      letterSpacing: "-2%",
      pm: "10",
      ms: "2",
      bg: "transparent",
      borderColor: "black",
      _hover: {
        bg: "yellow.500",
      },
      _active: {
        bg: "yellow.600",
      },
    },
  },
});
export default theme;
