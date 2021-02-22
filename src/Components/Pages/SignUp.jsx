import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { Box, Center, Input, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import UserPool from "../User/UserPool";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUnviersity] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    const attrs = [
      new CognitoUserAttribute({
        Name: "name",
        Value: "سعد السيد احمد",
      }),
      new CognitoUserAttribute({
        Name: "custom:university",
        Value: "جامعة بوليتكنيك فلسطين",
      }),
    ];
    UserPool.signUp(
      email,
      password,
      attrs,
      null,
      (err, data) => {
        if (err) {
          console.error(err);
        }
        console.log(data);
      }
    );
  };
  return (
    <Center>
      <form onSubmit={onSubmit}>
        <Input
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></Input>
        <Input
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></Input>
        <Button type="submit">Sign up</Button>
      </form>
    </Center>
  );
};

export default Signup;
