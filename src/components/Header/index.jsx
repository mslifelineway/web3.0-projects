import React, { useContext } from "react";
import { AiOutlineLogout } from "react-icons/ai";
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
  const { logout } = useContext(MoralisContext);

  const currentUserStringified = window.localStorage.getItem(
    `Parse/${process.env.REACT_APP_MORALIS_APP_ID}/currentUser`
  );
  const currentUser = currentUserStringified
    ? JSON.parse(currentUserStringified)
    : {};

  const menus = [
    { name: "Home", link: PAGE_PATHS.ROOT },
    { name: "Transactions", link: PAGE_PATHS.TRANSACTIONS },
  ];

  const RenderMenuItem = ({
    text,
    link,
    handleClick,
    button,
    title,
    style = {},
    className,
    children,
  }) => {
    return (
      <li
        className={className}
        style={style}
        title={title}
        onClick={handleClick}
      >
        {text && (button ? <Button text={text} /> : <a href={link}>{text}</a>)}
        {children}
      </li>
    );
  };

  const RenderMenus = () => {
    return menus.map(({ name, link, handleClick }) => (
      <div key={name}>
        <RenderMenuItem link={link} text={name} handleClick={handleClick} />
      </div>
    ));
  };

  let userInfo;

  if (currentUser?.authData?.moralisEth?.id)
    userInfo = shortenAddress(currentUser?.authData?.moralisEth?.id);
  else if (currentUser.username) userInfo = currentUser.username;

  return (
    <div className="header flex">
      <a href={PAGE_PATHS.ROOT}>
        <img src={MoralisLogoLight} alt="Logo" width={150} />
      </a>
      <div className="grow-1" />
      <div className="header__menus">
        <ul>
          <RenderMenus />
          {Object.keys(currentUser || {}).length !== 0 ? (
            <>
              {userInfo && (
                <RenderMenuItem
                  text={userInfo}
                  title="Logged in account address"
                  className="userinfo"
                />
              )}
              <RenderMenuItem
                handleClick={logout}
                className="logout__button"
                title="Logout"
              >
                <AiOutlineLogout />
              </RenderMenuItem>
            </>
          ) : (
            <>
              <RenderMenuItem
                text="Sign In"
                handleClick={handleAuthFormModalOpen}
              />
              <RenderMenuItem
                button
                text="Connect to wallet"
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
