import React, { useState, createContext } from "react";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [authFormModalOpen, setAuthFormModalOpen] = useState(false);
  const [walletsModalOpen, setWalletsModalOpen] = useState(false);

  const handleAuthFormModalOpen = () => setAuthFormModalOpen(true);
  const handleAuthFormModalClose = () => setAuthFormModalOpen(false);
  const handleWalletsModalOpen = () => setWalletsModalOpen(true);
  const handleWalletsModalClose = () => setWalletsModalOpen(false);

  return (
    <GlobalContext.Provider
      value={{
        authFormModalOpen,
        walletsModalOpen,
        handleAuthFormModalOpen,
        handleAuthFormModalClose,
        handleWalletsModalOpen,
        handleWalletsModalClose,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContextProvider, GlobalContext };
