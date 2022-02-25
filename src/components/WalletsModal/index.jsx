import React, { useContext } from "react";
import { Loader } from "..";
import { GlobalContext } from "../../contexts/GlobalContext";
import { MoralisContext } from "../../contexts/MoralisContext";
import Squarelink from "../../assets/images/squarelink.svg";
import MetamaskFox from "../../assets/images/metamask-fox.svg";
import CloseIcon from "../../assets/images/close-icon.svg";
import Fortmatic from "../../assets/images/fortmatic.svg";
import Portis from "../../assets/images/portis-io.svg";
import Walletconnect from "../../assets/images/walletconnect-circle-white.svg";
import Google from "../../assets/images/google.svg";
import "./styles.css";

const WalletsModal = () => {
  const { handleWalletsModalClose } = useContext(GlobalContext);
  const { signInUsingMetamask, authWithWalletConnect, isAuthenticating } =
    useContext(MoralisContext);

  const wallets = [
    {
      name: "MetaMask",
      title: "Connect to your Metamask Wallet",
      icon: MetamaskFox,
      handleClick: signInUsingMetamask,
    },
    {
      name: "WalletConnect",
      title: "Scan with WalletConnect to connect",
      icon: Walletconnect,
      handleClick: authWithWalletConnect,
    },
    { name: "Portis", title: "Connect with your Portis account", icon: Portis },
    {
      name: "Fortmatic",
      title: "Connect with your Fortmatic account",
      icon: Fortmatic,
    },
    {
      name: "Squarelink",
      title: "Connect with your Squarelink account",
      icon: Squarelink,
    },
    {
      name: "Google",
      title: "Connect with your Google account via Torus",
      icon: Google,
    },
  ];

  const WalletCard = ({ wallet = {} }) => {
    return (
      <div className="wallet__card" onClick={wallet.handleClick || null}>
        {wallet.icon && (
          <img src={wallet.icon} alt="wallet" className="wallet__icon" />
        )}
        <h5 className="name">{wallet.name}</h5>
        <p className="title">{wallet.title}</p>
      </div>
    );
  };
  return (
    <div className="walletsform">
      <div className="walletsform__inner">
        <img
          src={CloseIcon}
          alt="Close"
          className="close__icon"
          title="Close"
          onClick={handleWalletsModalClose}
        />
        <ul>
          {wallets.map((wallet) => {
            return (
              <li key={wallet.name}>
                <WalletCard wallet={wallet} />
              </li>
            );
          })}
        </ul>
        {isAuthenticating && (
          <Loader>
            <p>Authenticating....</p>
          </Loader>
        )}
      </div>
    </div>
  );
};

export default WalletsModal;
