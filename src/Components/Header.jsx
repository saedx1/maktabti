import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useHistory } from "react-router-dom";
import {
  Link,
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  CloseIcon,
  HamburgerIcon,
  AddIcon,
} from "@chakra-ui/icons";
import Logo from "./Logo";
import { UploadDrawer } from "./UploadDrawer";
import { AccountContext } from "./User/Account";

const NavBar = ({ loggedIn, ...props }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Logo w="100px" color={["white"]} />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} loggedIn={loggedIn} />
    </NavBarContainer>
  );
};

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box
      display={{ base: "block", md: "none" }}
      onClick={toggle}
    >
      {isOpen ? <CloseIcon /> : <HamburgerIcon />}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link
      href={to}
      _hover={{
        textDecoration: "none",
        textColor: "primary.100",
      }}
    >
      <Text textStyle="nav_item" display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const CurrentUserMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const { getSession, logout } = useContext(AccountContext);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    getSession().then(() => {
      setLoggedIn(true);
    });
  }, [getSession, logout, history]);

  const logoutToHome = useCallback(() => {
    logout();
    history.push("/");
  }, [logout, history]);

  return (
    <>
      <MenuItem to="/">الرئيسية</MenuItem>
      <MenuItem to="/universities">جامعات</MenuItem>
      {loggedIn && <MenuItem to="/mylibrary">مكتبتي</MenuItem>}
      <MenuItem to="/about">من نحن</MenuItem>
      {loggedIn ? (
        <MenuItem onClick={logoutToHome}>تسجيل الخروج</MenuItem>
      ) : (
        <MenuItem to="/login"> تسجيل / دخول </MenuItem>
      )}
      <MenuItem to={loggedIn ? null : "/login"} isLast>
        <Button
          size="lg"
          rounded="md"
          color={["primary.500"]}
          bg={["primary.white"]}
          _hover={{
            bg: ["primary.100"],
          }}
          rightIcon={<AddIcon />}
          onClick={loggedIn ? onOpen : null}
        >
          ارفع ملفاً
        </Button>
        <UploadDrawer isOpen={isOpen} onClose={onClose} />
      </MenuItem>
    </>
  );
};

const MenuLinks = ({ isOpen, loggedIn }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={7}
        align="center"
        justify={[
          "center",
          "space-between",
          "flex-end",
          "flex-end",
        ]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <CurrentUserMenu loggedIn={loggedIn} />
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
