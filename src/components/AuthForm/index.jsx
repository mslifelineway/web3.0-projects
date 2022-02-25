import React, { useContext } from "react";
import { Button } from "..";
import AuthFormLogo from "../../assets/images/girl-with-sphare.svg";
import MetamaskFox from "../../assets/images/metamask-fox.svg";
import CloseIcon from "../../assets/images/close-icon.svg";
import GoogleG from "../../assets/images/google-g-icon.svg";
import Divider from "../../assets/images/divider.svg";
import "./styles.css";
import { GlobalContext } from "../../contexts/GlobalContext";

const AuthForm = () => {
  const { handleAuthFormModalClose, handleWalletsModalOpen } =
    useContext(GlobalContext);

  return (
    <div className="authform">
      <div className="authform__inner">
        <img
          src={CloseIcon}
          alt="Close"
          className="close__icon"
          title="Close"
          onClick={handleAuthFormModalClose}
        />
        <img
          src={AuthFormLogo}
          alt="authform logo"
          className="auth__logo mb45"
        />
        <div className="action__buttons">
          <Button
            text="Login With Google"
            onClick={() => {}}
            icon={<img src={GoogleG} alt="metamask" />}
            className="mb20"
            style={{ color: "#fff" }}
          />
          <Button
            text="Connect to wallet"
            onClick={() => {
              handleAuthFormModalClose();
              handleWalletsModalOpen();
            }}
            icon={<img src={MetamaskFox} alt="metamask" />}
            className="mb20"
          />
          <img src={Divider} alt="divider" className="divider" />
          <Button
            text="Continue With Email"
            onClick={() => {}}
            className="mb20"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
