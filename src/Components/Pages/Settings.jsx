import React, { useState, useContext, useEffect } from "react";

import { AccountContext } from "../User/Account";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useToast,
} from "@chakra-ui/react";

function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [university, setUniversity] = useState("");
  const [match, setMatch] = useState(true);

  const { getSession, logout } = useContext(AccountContext);

  const toast = useToast();

  useEffect(() => {
    getSession().then((result) => {
      setName(result.name);
      setEmail(result.email);
      setUniversity(result["custom:university"]);
    });
  }, [getSession, logout]);

  const onSubmit = (event) => {
    event.preventDefault();

    if (password1 === password2) {
      getSession().then(({ user }) => {
        user.changePassword(password, password1, (err) => {
          if (err) {
            toast({
              title: "فشل تغيير كلمة السر",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          } else {
            toast({
              title: "تم تغيير كلمة السر بنجاح",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          }
        });
      });
    }
  };

  return (
    <Flex align={"center"} justify={"center"} bg={"primary.100"}>
      <Stack width="100%" spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <form onSubmit={onSubmit}>
            <Stack spacing={4}>
              <FormControl id="name">
                <FormLabel fontSize="xl">الاسم</FormLabel>
                <Input
                  isDisabled="true"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  fontSize="xl"
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel fontSize="xl">البريد الإلكتروني</FormLabel>
                <Input
                  isDisabled="true"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  fontSize="xl"
                />
              </FormControl>
              <FormControl id="university" fontSize="xl">
                <FormLabel fontSize="xl">الجامعة</FormLabel>
                <Input
                  isDisabled="true"
                  type="text"
                  value={university}
                  onChange={(event) => setUniversity(event.target.value)}
                  fontSize="xl"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel fontSize="xl">كلمة المرور الحالية</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  fontSize="xl"
                />
              </FormControl>
              <FormControl id="newpassword">
                <FormLabel fontSize="xl">كلمة المرور الجديدة</FormLabel>
                <Input
                  type="password"
                  value={password1}
                  onChange={(event) => setPassword1(event.target.value)}
                  fontSize="xl"
                />
              </FormControl>
              <FormControl id="newpassword2">
                <FormLabel fontSize="xl">
                  كلمة المرور الجديدة - مرة أخرى
                </FormLabel>
                <Input
                  type="password"
                  value={password2}
                  onChange={(event) => {
                    setPassword2(event.target.value);
                    setMatch(password1 === event.target.value);
                  }}
                  isInvalid={!match}
                  focusBorderColor="none"
                  fontSize="xl"
                />
              </FormControl>
              <Stack spacing={10}>
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
                  fontSize="xl"
                >
                  تأكيد
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Settings;
