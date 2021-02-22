import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import {
  Box,
  Center,
  Input,
  Button,
  Select,
  FormLabel,
} from "@chakra-ui/react";
import React, { useState } from "react";
import UserPool from "../User/UserPool";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUnviersity] = useState("");

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
    <Center bg="primary.100">
      <Box>
        <form onSubmit={onSubmit}>
          <Input
            bg="white"
            placeholder="الاسم"
            value={name}
            onChange={(event) => setName(event.target.value)}
            m={2}
          ></Input>
          <Input
            bg="white"
            placeholder="البريد الإلكتروني؛ يجب أن ينتهي ب edu أو edu.ps"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            mb={2}
            mr={2}
            ml={2}
          ></Input>

          <Input
            bg="white"
            placeholder="كلمة المرور"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            mb={2}
            mr={2}
            ml={2}
          ></Input>
          <Center>
            <FormLabel mr={2} ml={2}>
              الجامعة
            </FormLabel>
          </Center>
          <Center mb={2} mr={2} ml={2}>
            <Select
              bg="white"
              value={university}
              onChange={(event) => setUnviersity(event.target.value)}
            >
              <option> جامعة بوليتكنيك فلسطين</option>
              <option> جامعة بوليتكنيك فلسطين</option>
              <option> جامعة بوليتكنيك فلسطين</option>
            </Select>
          </Center>
          <Center>
            <Button bg="primary.300" type="submit">
              تسجيل
            </Button>
          </Center>
        </form>
      </Box>
    </Center>
  );
};

export default Signup;
