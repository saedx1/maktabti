import { Input } from "@chakra-ui/input";
import { Box, Button, Center } from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import { AccountContext } from "./Account";

export const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { getSession } = useContext(AccountContext);

  const onSubmit = (event) => {
    event.preventDefault();

    getSession().then(({ user }) => {
      user.changePassword(password, newPassword, (err, result) => {
        if (err) {
          console.error(err);
        }
      });
    });
  };
  return (
    <Center>
      <form onSubmit={onSubmit}>
        <Input
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Current Password"
        ></Input>
        <Input
          onChange={(event) => setNewPassword(event.target.value)}
          placeholder="New Password"
        ></Input>
        <Button type="submit">Submit</Button>
      </form>
    </Center>
  );
};
