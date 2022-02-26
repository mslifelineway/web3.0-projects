import React from "react";
import ReactDOM from "react-dom";
import { MoralisProvider } from "react-moralis";
import { ToastContainer } from "react-toastify";
import App from "./App";
import { GlobalContextProvider } from "./contexts/GlobalContext";
import { MoralisContextProvider } from "./contexts/MoralisContext";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const MORALIS_APP_ID =
  process.env.REACT_APP_MORALIS_APP_ID || "<YOUR_MORALIS_APP_ID>";
const SERVER_URL =
  process.env.REACT_APP_MORALIS_SERVER_URL || "<YOUR_MORALIS_SERVER_URL>";

const toastMessageOptions = {
  autoClose: 2000,
  position: "top-right",
  hideProgressBar: true,
  nnewestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: false,
  pauseOnHover: true,
};

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer {...toastMessageOptions} />
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
