import React, { useState, createContext, useEffect, useCallback } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TOAST_MESSAGE_TYPES } from "../utils/constants";

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
const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [authFormModalOpen, setAuthFormModalOpen] = useState(false);
  const [walletsModalOpen, setWalletsModalOpen] = useState(false);
  const [alertMessage, setAlert] = useState({
    message: "",
    type: "error",
  });

  const setAlertMessage = useCallback((message) => {
    setAlert(message);
  }, []);

  const handleAuthFormModalOpen = () => setAuthFormModalOpen(true);
  const handleAuthFormModalClose = () => setAuthFormModalOpen(false);
  const handleWalletsModalOpen = () => setWalletsModalOpen(true);
  const handleWalletsModalClose = () => setWalletsModalOpen(false);

  useEffect(() => {
    if (
      ![null, undefined, ""].includes(alertMessage.message) &&
      typeof alertMessage === "object"
    ) {
      if (alertMessage.type === TOAST_MESSAGE_TYPES.SUCCESS)
        toast.success(alertMessage.message, toastMessageOptions);
      else if (alertMessage.type === TOAST_MESSAGE_TYPES.WARNING)
        toast.warning(alertMessage.message, toastMessageOptions);
      else toast.error(alertMessage.message, toastMessageOptions);
    }
  }, [alertMessage]);

  return (
    <GlobalContext.Provider
      value={{
        authFormModalOpen,
        walletsModalOpen,
        handleAuthFormModalOpen,
        handleAuthFormModalClose,
        handleWalletsModalOpen,
        handleWalletsModalClose,
        alertMessage,
        setAlertMessage,
      }}
    >
      <ToastContainer {...toastMessageOptions} />
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContextProvider, GlobalContext };
