import React from "react";
import ReactDOM from "react-dom";
import { MoralisProvider } from "react-moralis";
import App from "./App";
import { GlobalContextProvider } from "./contexts/GlobalContext";
import { MoralisContextProvider } from "./contexts/MoralisContext";
import "./index.css";

const MORALIS_APP_ID =
  process.env.REACT_APP_MORALIS_APP_ID || "<YOUR_MORALIS_APP_ID>";
const SERVER_URL =
  process.env.REACT_APP_MORALIS_SERVER_URL || "<YOUR_MORALIS_SERVER_URL>";

ReactDOM.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <MoralisProvider appId={MORALIS_APP_ID} serverUrl={SERVER_URL}>
        <MoralisContextProvider>
          <App />
        </MoralisContextProvider>
      </MoralisProvider>
    </GlobalContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
