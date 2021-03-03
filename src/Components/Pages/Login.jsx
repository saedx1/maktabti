import React, { useState, useContext } from "react";
import { useHistory } from "react-router";

import { AccountContext } from "../User/Account";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Center,
  useToast,
} from "@chakra-ui/react";

export default function SimpleCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authenticate } = useContext(AccountContext);
  const history = useHistory();
  const toast = useToast();

  const loginToHome = () => {
    history.push("/");
    history.go();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    authenticate(email, password)
      .then(() => {
        loginToHome();
      })
      .catch(() => {
        toast({
          title: "فشل تسجيل الدخول",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex align={"center"} justify={"center"} bg={"primary.100"}>
      <Stack width="100%" spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <form onSubmit={onSubmit}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>البريد الإلكتروني (@edu أو @edu.ps)</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>كلمة المرور</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Link
                    color={"primary.400"}
                    onClick={() => {
                      history.push("/forgotpassword");
                      history.go();
                    }}
                  >
                    نسيت كلمة المرور؟
                  </Link>
                  <Link
                    onClick={() => {
                      history.push("/signup");
                      history.go();
                    }}
                    color={"primary.400"}
                  >
                    <Center
                      _hover={{
                        color: "primary.600",
                      }}
                    >
                      مستخدم جديد؟
                    </Center>
                  </Link>
                </Stack>
                <Button
                  bg={"primary.400"}
                  color={"white"}
                  _hover={{
                    bg: "primary.500",
                  }}
                  type="submit"
                  _focus={{
                    outline: "none",
                    border: "none",
                  }}
                >
                  دخول
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
// export default Login;
