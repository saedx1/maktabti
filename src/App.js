import "./App.css";
import { RtlProvider } from "./components/rtl-provider";
import { NavBar } from "./components/NavBar";

function App(props) {
  const { pageProps } = props;
  return (
    <RtlProvider>
      <NavBar {...pageProps} />
    </RtlProvider>
  );
}

export default App;
