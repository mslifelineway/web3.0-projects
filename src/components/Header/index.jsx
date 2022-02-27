import React, { useContext, useState } from "react";
import { AiOutlineLogout, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    // return (
    //   <li
    //     className={className}
    //     style={style}
    //     title={title}
    //     onClick={handleClick}
    //   >
    //     {text && (button ? <Button text={text} /> : <a href={link}>{text}</a>)}
    //     {children}
    //   </li>
    // );
    return (
      <div
        className={`flex-full-center ${className}`}
        title={title}
        onClick={() => {
          if (isMenuOpen) setIsMenuOpen(!isMenuOpen);
          handleClick();
        }}
        style={style}
      >
        {text && (button ? <Button text={text} /> : <a href={link}>{text}</a>)}
        {children}
      </div>
    );
  };

  const RenderMenus = () => {
    return menus.map(({ name, link, handleClick }) => (
      <li key={name}>
        <RenderMenuItem link={link} text={name} handleClick={handleClick} />
      </li>
    ));
  };

  let userInfo;

  if (currentUser?.authData?.moralisEth?.id)
    userInfo = shortenAddress(currentUser?.authData?.moralisEth?.id);
  else if (currentUser.username) userInfo = currentUser.username;

  const isUserAuthenticated = Object.keys(currentUser || {}).length !== 0;

  const RenderHeaderMenus = ({ className }) => {
    return (
      <ul className={className}>
        <RenderMenus />

        {!isUserAuthenticated && (
          <>
            <li>
              <RenderMenuItem
                text="Sign In"
                handleClick={handleAuthFormModalOpen}
              />
            </li>
            <li>
              <RenderMenuItem
                button
                text="Connect to wallet"
                handleClick={handleWalletsModalOpen}
                className="connect__wallet-button"
              />
            </li>
          </>
        )}

        {isUserAuthenticated && (
          <>
            {userInfo && (
              <>
                <li>
                  <RenderMenuItem
                    text={userInfo}
                    title="Logged in account address"
                    className="userinfo"
                  />
                </li>
                <li>
                  <RenderMenuItem
                    handleClick={logout}
                    className="logout__button"
                    title="Logout"
                  >
                    <AiOutlineLogout />
                  </RenderMenuItem>
                </li>
              </>
            )}
          </>
        )}
      </ul>
    );
  };

  return (
    <div className="header flex">
      <a href={PAGE_PATHS.ROOT}>
        <img src={MoralisLogoLight} alt="Logo" width={150} />
      </a>
      <div className="grow-1" />
      <div className="header__menus flex-full-center">
        <RenderHeaderMenus className="desktop__menus" />
        {isMenuOpen && <RenderHeaderMenus className="mobile__menus" />}
        <RenderMenuItem
          handleClick={() => setIsMenuOpen(!isMenuOpen)}
          className="menu__icon"
          title={`${isMenuOpen ? "Close" : "Open"} menu`}
        >
          {!isMenuOpen ? <AiOutlineMenu /> : <AiOutlineClose />}
        </RenderMenuItem>
      </div>
    </div>
  );
};
export default Header;
