import React from "react";
import ReactDOM from "react-dom";
import { MoralisProvider } from "react-moralis";
import App from "./App";
import { GlobalContextProvider } from "./contexts/GlobalContext";
import { MoralisContextProvider } from "./contexts/MoralisContext";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <MoralisProvider
        appId="j2z85AlLNxPJwiycfaWM8xMl04vArBfKNvJjJKWR"
        serverUrl="https://el6s2yzhi045.usemoralis.com:2053/server"
      >
        <MoralisContextProvider>
          <App />
        </MoralisContextProvider>
      </MoralisProvider>
    </GlobalContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
