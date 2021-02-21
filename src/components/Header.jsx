import React from "react";
import {
  Link,
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon, AddIcon } from "@chakra-ui/icons";
import Logo from "./Logo";
import { UploadDrawer } from "./UploadDrawer";
const NavBar = ({ isLoggedIn, ...props }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Logo w="100px" color={["white"]} />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} isLoggedIn={isLoggedIn} />
    </NavBarContainer>
  );
};

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <HamburgerIcon />}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link
      href={to}
      _hover={{ textDecoration: "none", textColor: "primary.100" }}
    >
      <Text textStyle="nav_item" display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const CurrentUserMenu = ({ isLoggedIn }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // isLoggedIn = false;

  return (
    <>
      <MenuItem to="/">الرئيسية</MenuItem>
      <MenuItem to="/">جامعات</MenuItem>
      {isLoggedIn ? (
        <MenuItem to="/">مكتبتي</MenuItem>
      ) : (
        <MenuItem to="/"> تسجيل / دخول </MenuItem>
      )}
      <MenuItem to="/">من نحن</MenuItem>
      <MenuItem to={isLoggedIn ? null : "/login"} isLast>
        <Button
          size="lg"
          rounded="md"
          color={["primary.500"]}
          bg={["primary.white"]}
          _hover={{
            bg: ["primary.100"],
          }}
          rightIcon={<AddIcon />}
          onClick={isLoggedIn ? onOpen : null}
        >
          ارفع ملفاً
        </Button>
        <UploadDrawer isOpen={isOpen} onClose={onClose} />
      </MenuItem>
    </>
  );
};

const MenuLinks = ({ isOpen, isLoggedIn }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={7}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <CurrentUserMenu isLoggedIn={isLoggedIn} />
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={3}
      bg={["primary.500"]}
      color={["white"]}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBar;
