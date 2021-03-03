import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import HomePage from "./Components/Pages/Home";

import { RtlProvider } from "./Components/rtl-provider";
import { Account, AccountContext } from "./Components/User/Account";
import Login from "./Components/Pages/Login";
import Header from "./Components/Header";
import NotFound from "./Components/Pages/NotFound";
import MyLibrary from "./Components/Pages/MyLibrary";
import About from "./Components/Pages/About";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Signup from "./Components/Pages/SignUp";
import AdvancedSearch from "./Components/Pages/AdvancedSearch";
import Settings from "./Components/Pages/Settings";
import { Spinner, Box, Stack } from "@chakra-ui/react";
import ForgotPassword from "./Components/Pages/ForgotPassword";

function App(props) {
  useEffect(() => {}, []);
  return (
    <RtlProvider>
      <Account>
        <PageComponent />
      </Account>
    </RtlProvider>
  );
}
function PageComponent() {
  const { getSession, logout } = useContext(AccountContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  getSession().then(({ user }) => {
    user.getSession((err, session) => {
      if (err) {
        console.log(err);
      } else if (!session.isValid()) {
        console.log("Invalid session.");
      } else {
        const tt = session.getIdToken().getJwtToken();
        setToken(tt);
      }
    });
  });

  useEffect(() => {
    getSession().then(
      () => {
        setLoggedIn(true);
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
  }, [getSession]);
  return (
    <BrowserRouter>
      {loading ? (
        <Stack
          fontSize={["lg", "xl", "2xl", "3xl"]}
          pt={[10, 20, 30, 40]}
          color="primary.500"
          direction="column"
          textAlign="center"
        >
          <Box>
            <Spinner h={70} w={70} color="primary.300" />
          </Box>
          <Box>الرجاء الانتظار؛ جاري تحميل الموقع ...</Box>
        </Stack>
      ) : (
        <>
          <Header loggedIn={loggedIn} logout={logout} idToken={token} />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/about" exact component={About} />
            <Route path="/mylibrary" exact component={MyLibrary} />
            <Route path="/advancedsearch" exact component={AdvancedSearch} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/forgotpassword" exact component={ForgotPassword} />
            <Route path="/" component={NotFound} />
          </Switch>
        </>
      )}
    </BrowserRouter>
  );
}
export default App;
