import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { Header, AuthForm, WalletsModal } from "..";
import { GlobalContext } from "../../contexts/GlobalContext";
import "./styles.css";

const Layout = ({ mainBgNotRequired, children }) => {
  const { authFormModalOpen, walletsModalOpen } = useContext(GlobalContext);

  const RenderModals = () => {
    return (
      <>
        {authFormModalOpen
          ? ReactDOM.createPortal(
              <AuthForm />,
              document.getElementById("auth__form_modal")
            )
          : ReactDOM.createPortal(
              "",
              document.getElementById("auth__form_modal")
            )}
        {walletsModalOpen
          ? ReactDOM.createPortal(
              <WalletsModal />,
              document.getElementById("wallets_modal")
            )
          : ReactDOM.createPortal("", document.getElementById("wallets_modal"))}
      </>
    );
  };

  return (
    <div
      className={`main__container section__padding ${
        !mainBgNotRequired ? "bg__main" : ""
      }`}
    >
      <RenderModals />
      <Header />
      {children}
    </div>
  );
};

export default Layout;
