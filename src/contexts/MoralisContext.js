import React, {
  useContext,
  createContext,
  useEffect,
  useCallback,
} from "react";
import { useMoralis } from "react-moralis";
import { MESSAGES } from "../utils/constants";
import { GlobalContext } from "./GlobalContext";

const MoralisContext = createContext();

const MoralisContextProvider = ({ children }) => {
  const { handleWalletsModalClose, setAlertMessage } =
    useContext(GlobalContext);
  const {
    logout,
    isAuthenticating,
    authenticate,
    isWeb3Enabled,
    isAuthenticated,
    user,
    enableWeb3,
    Moralis,
    authError,
  } = useMoralis();

  const signInUsingMetamask = () => {
    authenticate({
      signingMessage: MESSAGES.METAMASK_AUTH_MESSAGE,
    });
  };

  const authWithWalletConnect = () => {
    authenticate({
      provider: "walletconnect",
      chainId: 56,
      // mobileLinks: [
      //   "metamask",
      //   "trust",
      //   "rainbow",
      //   "argent",
      //   "imtoken",
      //   "pillar",
      // ],
      signingMessage: MESSAGES.WALLETCONNECT_AUTH_MESSAGE,
    });
  };
  const isUserAuthenticated = useCallback(
    () => isAuthenticated && user,
    [isAuthenticated, user]
  );

  const logoutUser = () => {
    logout();
    window.localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
    window.localStorage.clear();
  };

  useEffect(() => {
    // if (!isWeb3Enabled && isAuthenticated) {
    //   enableWeb3({ provider: "walletconnect", chainId: 56 });
    //   console.log("Congratulations! web3 has been activated");
    // }
  }, [isWeb3Enabled, isAuthenticated, enableWeb3]);

  useEffect(() => {
    if (isUserAuthenticated()) {
      handleWalletsModalClose();
    }
  }, [isAuthenticated, isUserAuthenticated, handleWalletsModalClose]);

  useEffect(() => {
    if (authError) {
      setAlertMessage({ message: authError.message });
    }
  }, [authError, setAlertMessage]);

  return (
    <MoralisContext.Provider
      value={{
        signInUsingMetamask,
        authWithWalletConnect,
        isUserAuthenticated,
        logout: logoutUser,
        isAuthenticating,
        Moralis,
      }}
    >
      {children}
    </MoralisContext.Provider>
  );
};

export { MoralisContextProvider, MoralisContext };
