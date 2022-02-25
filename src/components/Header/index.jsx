import React, { useContext } from "react";
import { Button } from "..";
import MoralisLogoLight from "../../assets/images/moralis-logo-light.svg";
import { GlobalContext } from "../../contexts/GlobalContext";
import { MoralisContext } from "../../contexts/MoralisContext";
import { PAGE_PATHS } from "../../utils/constants";
import { shortenAddress } from "../../utils/helpers";
import "./styles.css";

const Header = () => {
  const { handleAuthFormModalOpen, handleWalletsModalOpen } =
    useContext(GlobalContext);
  const { isUserAuthenticated, logout } = useContext(MoralisContext);

  const currentUserStringified = window.localStorage.getItem(
    `Parse/${process.env.REACT_APP_MORALIS_APP_ID}/currentUser`
  );
  const currentUser = currentUserStringified
    ? JSON.parse(currentUserStringified)
    : {};

  console.log("--->currentUser: ", currentUser);

  const menus = [
    { name: "Home", link: PAGE_PATHS.ROOT },
    { name: "Transactions", link: PAGE_PATHS.TRANSACTIONS },
  ];

  const RenderMenuItem = ({
    name,
    link,
    handleClick,
    button,
    title,
    style = {},
  }) => {
    return (
      <li>
        {button ? (
          <Button
            text="Connect to wallet"
            onClick={handleClick}
            title={title}
            style={style}
          />
        ) : (
          <a href={link} onClick={handleClick} title={title} style={style}>
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
            <>
              <RenderMenuItem name="Logout" handleClick={logout} />
              {currentUser?.authData?.moralisEth?.id && (
                <RenderMenuItem
                  name={shortenAddress(currentUser?.authData?.moralisEth?.id)}
                  title="Logged in account address"
                  style={{
                    fontWeight: "bold",
                    color: "#ffc83d",
                    cursor: "auto",
                  }}
                />
              )}
            </>
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
