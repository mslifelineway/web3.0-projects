import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "web3uikit";
import "./Player.css";

const Player = () => {
  const { state: currentlyPlaying } = useLocation();

  if (
    currentlyPlaying &&
    currentlyPlaying !== "" &&
    typeof currentlyPlaying === "string"
  )
    return (
      <div className="playerPage">
        <video autoPlay controls className="videoPlayer">
          <source src={currentlyPlaying} type="video/mp4" />
        </video>
        <div className="backHome">
          <Link to="/">
            <Icon
              className="backButton"
              fill="rgba(255, 255, 255, 0.25)"
              size={60}
              svg="arrowCircleLeft"
            />
          </Link>
        </div>
      </div>
    );

  return <div className="playerPage file404"> File does not exists!</div>;
};

export default Player;
