// import React, { useState, useContext, useEffect, useCallback } from "react";
// import { useHistory } from "react-router-dom";
// import {
//   Link,
//   Box,
//   Flex,
//   Text,
//   Button,
//   Stack,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { CloseIcon, HamburgerIcon, AddIcon } from "@chakra-ui/icons";
// import Logo from "./Logo";
// import { UploadDrawer } from "./UploadDrawer";
// import { AccountContext } from "./User/Account";
// import theme from "../theme";
// const NavBar = ({ loggedIn, ...props }) => {
//   const [isOpen, setIsOpen] = React.useState(false);

//   const toggle = () => setIsOpen(!isOpen);
//   return (
//     <NavBarContainer {...props}>
//       <Logo w="100px" color={["primary.white"]} />
//       <MenuToggle toggle={toggle} isOpen={isOpen} />
//       <MenuLinks isOpen={isOpen} loggedIn={loggedIn} />
//     </NavBarContainer>
//   );
// };

// const MenuToggle = ({ toggle, isOpen }) => {
//   return (
//     <Box display={{ base: "block", md: "none" }} onClick={toggle}>
//       {isOpen ? <CloseIcon /> : <HamburgerIcon />}
//     </Box>
//   );
// };

// const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
//   return (
//     <Link
//       href={to}
//       _hover={{
//         textDecoration: "none",
//       }}
//     >
//       <Text textStyle="nav_item" display="block" {...rest}>
//         {children}
//       </Text>
//     </Link>
//   );
// };

// const CurrentUserMenu = () => {
// const { isOpen, onOpen, onClose } = useDisclosure();
// const history = useHistory();

// const { getSession, logout } = useContext(AccountContext);
// const [loggedIn, setLoggedIn] = useState(false);

// useEffect(() => {
//   getSession().then(() => {
//     setLoggedIn(true);
//   });
// }, [getSession, logout, history]);

// const logoutToHome = useCallback(() => {
//   logout();
//   history.push("/");
// }, [logout, history]);

//   return (
//     <>
//       {/* <MenuItem to="/">الرئيسية</MenuItem>
//       <MenuItem to="/advancedsearch">بحث متقدم</MenuItem>
//       {loggedIn && <MenuItem to="/mylibrary">مكتبتي</MenuItem>}
//       <MenuItem to="/about">من نحن</MenuItem> */}
//       {loggedIn ? (
//         <MenuItem onClick={logoutToHome}>
//           <Button
//             size="lg"
//             rounded="md"
//             color={["primary.500"]}
//             bg={["primary.white"]}
//             _hover={{
//               bg: ["primary.100"],
//             }}
//             onClick={loggedIn ? onOpen : null}
//           >
//             تسجيل الخروج
//           </Button>
//         </MenuItem>
//       ) : (
//         <MenuItem to="/login">
//           <Button
//             size="lg"
//             rounded="md"
//             color={["primary.500"]}
//             bg={["primary.white"]}
//             _hover={{
//               bg: ["primary.100"],
//             }}
//             onClick={loggedIn ? onOpen : null}
//           >
//             {" "}
//             تسجيل / دخول{" "}
//           </Button>
//         </MenuItem>
//       )}
//       <MenuItem to={loggedIn ? null : "/login"} isLast>
//         <Button
//           size="lg"
//           rounded="md"
//           color={["primary.500"]}
//           bg={["primary.white"]}
//           _hover={{
//             bg: ["primary.100"],
//           }}
//           rightIcon={<AddIcon />}
//           onClick={loggedIn ? onOpen : null}
//         >
//           ارفع ملفاً
//         </Button>
//         <UploadDrawer isOpen={isOpen} onClose={onClose} />
//       </MenuItem>
//     </>
//   );
// };

// const MenuLinks = ({ isOpen, loggedIn }) => {
//   return (
//     <Box
//       display={{ base: isOpen ? "block" : "none", md: "block" }}
//       flexBasis={{ base: "100%", md: "auto" }}
//     >
//       <Stack
//         spacing={7}
//         align="center"
//         justify={["center", "space-between", "flex-end", "flex-end"]}
//         direction={["column", "row", "row", "row"]}
//         pt={[4, 4, 0, 0]}
//       >
//         <CurrentUserMenu loggedIn={loggedIn} />
//       </Stack>
//     </Box>
//   );
// };

// const NavBarContainer = ({ children, ...props }) => {
//   return (
//     <Flex
//       as="nav"
//       align="center"
//       justify="space-between"
//       wrap="wrap"
//       w="100%"
//       p={3}
//       bg={["primary.500"]}
//       color={["primary.white"]}
//       {...props}
//     >
//       {children}
//     </Flex>
//   );
// };

// export default NavBar;

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";

import Logo from "./Logo";
import theme from "../theme";
import { UploadDrawer } from "./UploadDrawer";
import { HiOutlineLogin } from "react-icons/hi";

const Links = [
  { text: "الرئيسية", to: "/" },
  { text: "بحث متقدم", to: "/advancedsearch" },
  { text: "فريق العمل", to: "/about" },
];

const NavLink = ({ text, to }) => (
  <Link
    px={2}
    py={1}
    textStyle="nav_item"
    rounded="md"
    _hover={{ textDecoration: "none", bg: "gray.200" }}
    href={to}
  >
    {text}
  </Link>
);

const WithAction = ({ loggedIn, logout }) => {
  document.body.style.backgroundColor = theme.colors.primary["100"];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const Closure = () => {
    return useDisclosure();
  };
  const DrawerClosure = Closure();

  const history = useHistory();

  const logoutToHome = useCallback(() => {
    logout();
    history.push("/");
    history.go();
    window.location.reload(true);
  }, [logout, history]);

  return (
    <>
      <Box bg="primary.400" px={4}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: !isOpen ? "none" : "inherit" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Logo></Logo>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.to} {...link}></NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Button
              textStyle="nav_item"
              color="primary.500"
              bg="primary.white"
              mr={4}
              leftIcon={<AddIcon />}
              _focus={{
                outline: "none",
                border: "none",
              }}
              _hover={{
                bg: "primary.100",
              }}
              onClick={
                loggedIn
                  ? DrawerClosure.onOpen
                  : () => {
                      history.push("/login");
                    }
              }
            >
              ارفع ملفاً
            </Button>
            <UploadDrawer
              isOpen={DrawerClosure.isOpen}
              onClose={DrawerClosure.onClose}
            />
            {loggedIn ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  _focus={{
                    outline: "none",
                  }}
                >
                  <Avatar size={"sm"} />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    as="button"
                    onClick={() => history.push("/mylibrary")}
                  >
                    مكتبتي
                  </MenuItem>
                  <MenuItem
                    as="button"
                    onClick={() => history.push("/settings")}
                  >
                    اعداداتي
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem as="button" onClick={logoutToHome}>
                    تسجيل الخروج
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                fontSize="2xl"
                bg="primary.500"
                color="white"
                leftIcon={<HiOutlineLogin />}
                _hover={{
                  textColor: "primary.500",
                  bg: "white",
                }}
                onClick={() => {
                  history.push("/login");
                  history.go();
                }}
              >
                دخول
              </Button>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default WithAction;
