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

const NavLink = ({ children, ...props }) => (
  <Link
    px={2}
    py={1}
    textStyle="nav_item"
    rounded="md"
    _hover={{ textDecoration: "none", bg: "gray.200" }}
    href={children.to}
    {...props}
  >
    {children.text}
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
    window.location.href = "/";
  }, [logout]);

  return (
    <>
      <Box bg="primary.500" px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
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
              {Links.map((link, i) => (
                <NavLink key={link + "_" + i}>{link}</NavLink>
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
                  {/* <MenuItem
                    as="button"
                    onClick={() => (window.location.href = "/mylibrary")}
                    fontSize="xl"
                  >
                    مكتبتي
                  </MenuItem> */}
                  <MenuItem
                    as="button"
                    onClick={() => (window.location.href = "/settings")}
                    fontSize="xl"
                  >
                    اعداداتي
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem as="button" onClick={logoutToHome} fontSize="xl">
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
            <Stack
              as={"nav"}
              borderBottomColor="black"
              borderBottomStyle="solid"
            >
              {Links.map((link) => (
                <NavLink key={link + "_2"} textColor="black">
                  {link}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default WithAction;
