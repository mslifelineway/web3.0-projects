import React, { useState, useEffect, useCallback } from "react";
import {
  ConnectButton,
  Icon,
  Tab,
  TabList,
  Button,
  Modal,
  useNotification,
} from "web3uikit";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { NetflixLogo } from "../images";
import { movies } from "../helpers/library";
import "./Home.css";

const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const dispatch = useNotification();
  const { isAuthenticated, Moralis, account } = useMoralis();
  const [myMovies, setMyMovies] = useState([]);

  const resetSelectedMovie = () => {
    setSelectedMovie(null);
  };

  const startMoralis = useCallback(async () => {
    const serverUrl = process.env.REACT_APP_SERVER_URL || "";
    const appId = process.env.REACT_APP_APPLICATION_ID || "";
    await Moralis.start({ serverUrl, appId });
  }, [Moralis]);

  const fetchMyList = useCallback(async () => {
    const myList = await Moralis.Cloud.run("getMyMoviesList", {
      address: account,
    });
    const filteredMoviesByList = movies.filter(
      (_movie) => myList.indexOf(_movie.Name) > -1
    );
    setMyMovies(filteredMoviesByList);
  }, [Moralis.Cloud, account]);

  useEffect(() => {
    startMoralis();
    fetchMyList();
  }, [fetchMyList, startMoralis]);

  const handleNewNotification = (type, message, title, position) => {
    dispatch({
      type: type || "error",
      message: message || "Please connect your crypto wallet",
      title: title || "Not Authenticated",
      position: position || "topL",
    });
  };

  const addToMyList = async (movie) => {
    if (movie && movie.Name && movie.Name !== "") {
      await Moralis.Cloud.run("addMovieToMyMoviesList", {
        address: account,
        movie: movie.Name,
      });
      handleNewNotification(
        "success",
        `'${movie.Name}' added to list`,
        "Success"
      );
    }
  };

  return (
    <>
      <div className="logo">
        <img src={NetflixLogo} alt="logo" />
      </div>
      <div className="connect">
        <Icon fill="#fff" size={24} svg="bell" />
        <ConnectButton />
      </div>
      <div className="topBanner">
        <TabList defaultActiveKey={1} tabStyle="bar">
          <Tab tabKey={1} tabName="Movies">
            <div className="scene">
              <img src={movies[0].Scene} alt="scene" className="sceneImg" />
              <img src={movies[0].Logo} alt="logo" className="sceneLogo" />
              <p className="sceneDesc">{movies[0].Description}</p>
              <div className="playButton">
                <Link
                  to={isAuthenticated ? "/player" : "#"}
                  state={movies[0].Movie}
                >
                  <Button
                    icon="chevronRightX2"
                    text="Play"
                    theme="secondary"
                    type="button"
                    onClick={isAuthenticated ? null : handleNewNotification}
                  />
                </Link>
                <Button
                  icon="plus"
                  text="Add to my playlist"
                  theme="translucent"
                  type="button"
                  onClick={() =>
                    isAuthenticated
                      ? addToMyList(movies[0])
                      : handleNewNotification()
                  }
                />
              </div>
            </div>
            <div className="title">Movies</div>
            <div className="thumbs">
              {movies &&
                movies.map((_movie, index) => (
                  <img
                    src={_movie.Thumbnail}
                    key={`${_movie.Name}_${index}`}
                    alt="thumb"
                    className="thumbnail"
                    onClick={() => setSelectedMovie(_movie)}
                  />
                ))}
            </div>
          </Tab>
          {/* <Tab tabKey={2} tabName="Series" isDisabled /> */}
          <Tab tabKey={3} tabName="My List">
            <div className="title" style={{ marginTop: "2rem" }}>
              Your Library
            </div>
            <div className="ownListContent">
              {myMovies && isAuthenticated ? (
                <div className="ownThumbs">
                  {typeof myMovies === "object" &&
                  myMovies.length &&
                  myMovies.length > 0 ? (
                    myMovies.map((_movie, index) => (
                      <img
                        src={_movie.Thumbnail}
                        key={`${_movie.Name}_${index}`}
                        alt="thumb"
                        className="thumbnail"
                        onClick={() => setSelectedMovie(_movie)}
                      />
                    ))
                  ) : (
                    <div className="ownThumbs">Your list is empty.</div>
                  )}
                </div>
              ) : (
                <div className="ownThumbs">Login to view your own list.</div>
              )}
            </div>
          </Tab>
        </TabList>
        {selectedMovie &&
          typeof selectedMovie === "object" &&
          Object.keys(selectedMovie).length && (
            <div className="modal">
              <Modal
                isVisible
                onCloseButtonPressed={resetSelectedMovie}
                hasFooter={false}
                width="50%"
              >
                <div className="modalContent">
                  <img
                    src={selectedMovie.Scene}
                    alt="scene"
                    className="sceneImg"
                  />
                  <img
                    src={selectedMovie.Logo}
                    alt="logo"
                    className="sceneLogo"
                  />
                  <div className="modalPlayButton">
                    <Link
                      to={isAuthenticated ? "/player" : "#"}
                      state={selectedMovie.Movie}
                    >
                      <Button
                        icon="chevronRightX2"
                        text="Play"
                        theme="secondary"
                        type="button"
                        onClick={isAuthenticated ? null : handleNewNotification}
                      />
                    </Link>
                    <Button
                      icon="plus"
                      text="Add to my playlist"
                      theme="translucent"
                      type="button"
                      onClick={() =>
                        isAuthenticated
                          ? addToMyList(selectedMovie)
                          : handleNewNotification()
                      }
                    />
                  </div>
                  <div className="movieInfo">
                    <div className="description">
                      <div className="details">
                        <span>{selectedMovie.Year}</span>
                        <span>{selectedMovie.Duration}</span>
                      </div>
                      {selectedMovie.Description}
                    </div>
                    <div className="detailedInfo">
                      Genre:
                      <span className="deets">{selectedMovie.Genre}</span>
                      <br />
                      Actors:
                      <span className="deets">{selectedMovie.Actors}</span>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          )}
      </div>
    </>
  );
};

export default Home;
