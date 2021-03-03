import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import {
  Box,
  Input,
  Button,
  Select,
  FormLabel,
  // useToast,
  FormControl,
  Flex,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import UserPool from "../User/UserPool";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUnviersity] = useState("");

  // const toast = useToast();

  const onSubmit = (event) => {
    event.preventDefault();
    const attrs = [
      new CognitoUserAttribute({
        Name: "name",
        Value: name,
      }),
      new CognitoUserAttribute({
        Name: "custom:university",
        Value: university,
      }),
    ];
    UserPool.signUp(email, password, attrs, null, (err, data) => {
      if (err) {
        console.error(err);
      }
      console.log(data);
    });
  };
  return (
    <Flex align={"center"} justify={"center"} bg={"primary.100"}>
      <Stack width="100%" spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <form onSubmit={onSubmit}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>الاسم</FormLabel>
                <Input
                  bg="white"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel>البريد الإلكتروني</FormLabel>
                <Input
                  bg="white"
                  placeholder="يجب أن ينتهي ب edu أو edu.ps"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                ></Input>
              </FormControl>

              <FormControl>
                <FormLabel>كلمة المرور</FormLabel>
                <Input
                  bg="white"
                  placeholder="تتكون من 8 رموز من أحرف وأرقام"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel>الجامعة</FormLabel>
                <Select
                  bg="white"
                  value={university}
                  onChange={(event) => setUnviersity(event.target.value)}
                >
                  <option> جامعة بوليتكنيك فلسطين</option>
                  <option> جامعة بوليتكنيك فلسطين</option>
                  <option> جامعة بوليتكنيك فلسطين</option>
                </Select>
              </FormControl>
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
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Signup;
