import React, { useContext } from "react";
import { Button } from "..";
import MoralisLogoLight from "../../assets/images/moralis-logo-light.svg";
import { GlobalContext } from "../../contexts/GlobalContext";
import { MoralisContext } from "../../contexts/MoralisContext";
import { PAGE_PATHS } from "../../utils/constants";

import "./styles.css";

const Header = () => {
  const { handleAuthFormModalOpen, handleWalletsModalOpen } =
    useContext(GlobalContext);
  const { isUserAuthenticated, logout } = useContext(MoralisContext);

  const menus = [
    { name: "Home", link: PAGE_PATHS.ROOT },
    { name: "Transactions", link: PAGE_PATHS.TRANSACTIONS },
  ];

  const RenderMenuItem = ({ name, link, handleClick, button }) => {
    return (
      <li>
        {button ? (
          <Button text="Connect to wallet" onClick={handleClick} />
        ) : (
          <a href={link} onClick={handleClick}>
            {name}
          </a>
        )}
      </li>
    );
  };

  const RenderMenus = () => {
    return menus.map(({ name, link, handleClick }) => (
      <div key={name}>
        <RenderMenuItem link={link} name={name} handleClick={handleClick} />
      </div>
    ));
  };
  return (
    <div className="header flex">
      <a href={PAGE_PATHS.ROOT}>
        <img src={MoralisLogoLight} alt="Logo" width={150} />
      </a>
      <div className="grow-1" />
      <div className="header__menus">
        <ul>
          <RenderMenus />
          {isUserAuthenticated() ? (
            <RenderMenuItem name="Logout" handleClick={logout} />
          ) : (
            <>
              <RenderMenuItem
                name="Sign In"
                handleClick={handleAuthFormModalOpen}
              />
              <RenderMenuItem
                button
                name="Connect to wallet"
                handleClick={handleWalletsModalOpen}
              />
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Header;
