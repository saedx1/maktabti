import React from "react"
import "./App.css";
import { RtlProvider } from "./components/rtl-provider";
import Header from "./components/Header";
import {MainBody} from "./components/Body"
function App(props) {
  // const { pageProps } = props;
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  return (
    <RtlProvider>
      <Header isLoggedIn={isLoggedIn}/>
      <MainBody isLoggedIn={isLoggedIn}/>
    </RtlProvider>
  );
}

export default App;
