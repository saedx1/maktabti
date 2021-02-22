import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import HomePage from "./Components/Pages/Home";

import { RtlProvider } from "./Components/rtl-provider";
import { Account } from "./Components/User/Account";
import Login from "./Components/Pages/Login";
import Header from "./Components/Header";
import NotFound from "./Components/Pages/NotFound";
import MyLibrary from "./Components/Pages/MyLibrary";
import University from "./Components/Pages/Universities";
import About from "./Components/Pages/About";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Signup from "./Components/Pages/Signup";

function App(props) {
  useEffect(() => {}, []);
  return (
    <RtlProvider>
      <Account>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/about" exact component={About} />
            <Route path="/mylibrary" exact component={MyLibrary} />
            <Route path="/universities" exact component={University} />
            <Route path="/universities/:id" exact component={University} />
            <Route path="/" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Account>
    </RtlProvider>
  );
}

export default App;
