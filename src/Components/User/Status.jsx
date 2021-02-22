import { Button } from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";
import { AccountContext } from "./Account";

const Status = () => {
  const { getSession, logout } = useContext(AccountContext);

  const [status, setStatus] = useState(false);

  useEffect(() => {
    getSession().then((session) => {
      console.log("Session: ", session);
      setStatus(true);
    });
  }, []);

  return (
    <div>
      {status ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        "Please login"
      )}
    </div>
  );
};

export default Status;
