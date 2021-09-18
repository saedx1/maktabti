import { Box } from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";
import { AccountContext } from "./Account";
import { ChangePassword } from "./ChangePassword";
const Settings = () => {
  const { getSession } = useContext(AccountContext);

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    getSession().then(() => {
      setLoggedIn(true);
    });
  }, []);

  return (
    <Box>
      {loggedIn && (
        <>
          Settings
          <ChangePassword></ChangePassword>
        </>
      )}
    </Box>
  );
};

export default Settings;
