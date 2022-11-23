import React, { useContext, useEffect, useState } from "react";
import fetchFromSpotify, { request } from "../../services/api";
import { ConfigurationContext } from "../../contextState/Context";
import { Link } from "react-router-dom";
import "./styles.css";

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";

const Home = () => {
  const [genres, setGenres] = useState([]);
  const [authLoading, setAuthLoading] = useState(false);
  const [configLoading, setConfigLoading] = useState(false);
  const { token, setToken } = useContext(ConfigurationContext);
  const { selectedGenre, setSelectedGenre } = useContext(ConfigurationContext);
  const { songCount, setSongCount } = useContext(ConfigurationContext);
  const { artistCount, setArtistCount } = useContext(ConfigurationContext);

  const loadGenres = async (t) => {
    setConfigLoading(true);
    const response = await fetchFromSpotify({
      token: t,
      endpoint: "recommendations/available-genre-seeds",
    });
    console.log(response);
    setGenres(response.genres);
    setConfigLoading(false);
  };

  const songCountHandler = (e) => {
    setSongCount(e.target.value);
    localStorage.setItem("songCount", e.target.value);
  };

  const artistCountHandler = (e) => {
    setArtistCount(e.target.value);
    localStorage.setItem("artistCount", e.target.value);
  };

  useEffect(() => {
    setAuthLoading(true);
    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        setAuthLoading(false);
        setToken(storedToken.value);
        loadGenres(storedToken.value);
        return;
      }
    }
    console.log("Sending request to AWS endpoint");
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      setAuthLoading(false);
      setToken(newToken.value);
      loadGenres(newToken.value);
    });
  }, []);

  if (authLoading || configLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="configurationDiv">
      <div>{`Settings: genre = ${selectedGenre}, songs= ${songCount}, artists = ${artistCount} `}</div>
      <h1>Lets get your game started! </h1>
      <div className="ChoiceDiv">
        <h1 className="title">Pick a Genre</h1>
        <select
          value={selectedGenre}
          onChange={(event) => {
            setSelectedGenre(event.target.value);
            localStorage.setItem(
              "selectedGenre",
              JSON.stringify(event.target.value)
            );
          }}
        >
          <option value="" />
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div className="ChoiceDiv">
        <h1 className="title">Pick the Number of songs </h1>
        <div className="songButtonDiv">
          <button
            className="choiceButton"
            value={1}
            onClick={(e) => songCountHandler(e)}
          >
            {" "}
            1{" "}
          </button>
          <button
            className="choiceButton"
            value={2}
            onClick={(e) => songCountHandler(e)}
          >
            {" "}
            2{" "}
          </button>
          <button
            className="choiceButton"
            value={3}
            onClick={(e) => songCountHandler(e)}
          >
            3
          </button>
        </div>
      </div>
      <div className="ChoiceDiv">
        <h1 className="title">Pick the Number of artists </h1>
        <div className="artistButtonDiv">
          <button
            className="choiceButton"
            value={2}
            onClick={(e) => artistCountHandler(e)}
          >
            {" "}
            2{" "}
          </button>
          <button
            className="choiceButton"
            value={3}
            onClick={(e) => artistCountHandler(e)}
          >
            3
          </button>
          <button
            className="choiceButton"
            value={4}
            onClick={(e) => artistCountHandler(e)}
          >
            {" "}
            4{" "}
          </button>
        </div>
      </div>{" "}
      <Link className="startGameText" to="/Game">
        Start Game
      </Link>
    </div>
  );
};

export default Home;
