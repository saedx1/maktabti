import React from "react";
import {
  Flex,
  useColorMode,
  Button,
  Text,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuIcon,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header>
      <Flex layerStyle="navBar" p={2} justifyContent="center">
        <Box as={Button} textStyle="nav_item">
          مكتبتي
        </Box>
        <Box as={Button} textStyle="nav_item">
          جامعات
        </Box>
        <Box as={Button} textStyle="nav_item">
          دخول
        </Box>
        <Box as={Button} textStyle="nav_item">
          تسجيل
        </Box>

        {/* <Menu matchWidth={true}>
          <MenuButton
            as={IconButton}
            icon={<HamburgerIcon />}
          ></MenuButton>
          <MenuList w={4}>
            {}
            <MenuItem>جامعات</MenuItem>
            <MenuItem>تسجيل</MenuItem>
            <MenuItem>من نحن</MenuItem>
          </MenuList>
        </Menu> */}
      </Flex>
    </header>
  );
};

// <Button bg="black" onClick={toggleColorMode}>
// Toggle Color Mode
// </Button>
