import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Spinner, Box, Stack } from "@chakra-ui/react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "./App.css";
import { Account, AccountContext } from "./Components/User/Account";
import { RtlProvider } from "./Components/rtl-provider";
import Header from "./Components/Header";
import HomePage from "./Components/Pages/Home";
import Login from "./Components/Pages/Login";
import NotFound from "./Components/Pages/NotFound";
import MyLibrary from "./Components/Pages/MyLibrary";
import About from "./Components/Pages/About";
import AdvancedSearch from "./Components/Pages/AdvancedSearch";
import Settings from "./Components/Pages/Settings";
import ForgotPassword from "./Components/Pages/ForgotPassword";
import Signup from "./Components/Pages/Signup";
import FileDetails from "./Components/Pages/FileDetails";
import NormalSearch from "./Components/Pages/NormalSearch";
import { SWRConfig } from "swr";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

function App() {
  useEffect(() => {}, []);
  return (
    <RtlProvider>
      <Account>
        <SWRConfig
          value={{
            fetcher: (url) =>
              axios(url).then((r) => {
                return r.data;
              }),
            dedupingInterval: 10000,
            refreshInterval: 0,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
          }}
        >
          <PageComponent />
        </SWRConfig>
      </Account>
    </RtlProvider>
  );
}
function PageComponent() {
  const { getSession, logout } = useContext(AccountContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

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
        <LoadingComponent />
      ) : (
        <>
          <Header loggedIn={loggedIn} logout={logout} />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/about" exact component={About} />
            {loggedIn && (
              <Route path="/mylibrary" exact component={MyLibrary} />
            )}
            <Route
              path="/advancedsearch"
              exact
              render={() => <AdvancedSearch />}
            />
            {loggedIn && <Route path="/settings" exact component={Settings} />}
            <Route path="/search" exact component={NormalSearch} />
            <Route path="/forgotpassword" exact component={ForgotPassword} />
            <Route path="/file/:file_id" component={FileDetails} />
            <Route path="/" component={NotFound} />
          </Switch>
        </>
      )}
    </BrowserRouter>
  );
}

export function LoadingComponent({ text }) {
  return (
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
      <Box>{text ? text : "الرجاء الانتظار؛ جاري تحميل الموقع ..."}</Box>
    </Stack>
  );
}

export default App;
