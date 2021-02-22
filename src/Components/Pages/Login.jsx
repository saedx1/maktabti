import { Center, Input, Button, Box } from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router";

import { AccountContext } from "../User/Account";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authenticate } = useContext(AccountContext);
  const history = useHistory();

  const loginToHome = () => history.push("/");

  const onSubmit = (event) => {
    event.preventDefault();
    authenticate(email, password)
      .then((data) => {
        loginToHome();
      })
      .catch((err) => {
        console.error("Failed to login", err);
      });
  };
  return (
    <Center bg="primary.100">
      <Box>
        <form onSubmit={onSubmit}>
          <Input
            bg="white"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            m={2}
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
            <Button type="submit">تسجيل الدخول</Button>
          </Center>
        </form>
      </Box>
    </Center>
  );
};

export default Login;
