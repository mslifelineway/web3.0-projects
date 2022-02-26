import React, {
  useContext,
  createContext,
  useEffect,
  useCallback,
} from "react";
import { useMoralis } from "react-moralis";
import { toast } from "react-toastify";
import { MESSAGES } from "../utils/constants";
import { GlobalContext } from "./GlobalContext";

const MoralisContext = createContext();

const MoralisContextProvider = ({ children }) => {
  const { handleWalletsModalClose, handleAuthFormModalClose } =
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

  const signInUsingMetamask = async () => {
    const authResp = await authenticate({
      signingMessage: MESSAGES.METAMASK_AUTH_MESSAGE,
    });
    if (authResp) {
      toast.success(MESSAGES.LOGGED_IN);
    }
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

  const enableWeb3Instance = useCallback(async () => {
    if (Moralis.web3) {
      window.web3 = await Moralis.web3.enable();
      console.log("Congratulations! web3 has been activated");
    }
  }, [Moralis.web3]);

  useEffect(() => {
    if (!isWeb3Enabled && isAuthenticated) {
      enableWeb3Instance();
      // enableWeb3({ provider: "walletconnect", chainId: 56 });
    }
  }, [isWeb3Enabled, isAuthenticated, enableWeb3, enableWeb3Instance]);

  useEffect(() => {
    if (isUserAuthenticated()) {
      handleAuthFormModalClose();
      handleWalletsModalClose();
    }
  }, [
    isAuthenticated,
    isUserAuthenticated,
    handleAuthFormModalClose,
    handleWalletsModalClose,
  ]);

  useEffect(() => {
    if (authError) {
      toast.error(authError.message);
    }
  }, [authError]);

  const signInWithEmailAndPassword = async ({ email, password }) => {
    try {
      await Moralis.User.logIn(email, password);
      handleAuthFormModalClose();
    } catch (error) {
      toast.error(error.message || MESSAGES.LOGIN_FAILED);
    }
  };

  const signUpWithEmailAndPassword = async ({ email, password }) => {
    const user = new Moralis.User();
    user.set("username", email);
    user.set("email", email);
    user.set("password", password);
    try {
      await user.signUp();
      await signInWithEmailAndPassword({
        email,
        password,
      });
      toast.success(MESSAGES.ACCOUNT_CREATED_AND_LOGGED_IN);
    } catch (error) {
      if (error.code === 202) {
        await signInWithEmailAndPassword({
          email,
          password,
        });
        return toast.success(MESSAGES.LOGGED_IN);
      }
      toast.error(error.message || MESSAGES.SIGNUP_FAILED);
    }
  };

  return (
    <MoralisContext.Provider
      value={{
        signInUsingMetamask,
        authWithWalletConnect,
        isUserAuthenticated,
        logout: logoutUser,
        isAuthenticating,
        Moralis,
        signUpWithEmailAndPassword,
        signInWithEmailAndPassword,
      }}
    >
      {children}
    </MoralisContext.Provider>
  );
};

export { MoralisContextProvider, MoralisContext };
