import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ConfigurationContext } from "../../contextState/Context";
import "./styles.css";

const EndGame = () => {
  const { points, setPoints } = useContext(ConfigurationContext);

  return (
    <div className="endGamediv">
      <div>You scored: {points} points</div>
      <Link
        onClick={() => {
          setPoints(0);
        }}
        className="startGameText"
        to="/Game"
      >
        Restart Game
      </Link>
      <Link
        onClick={() => {
          setPoints(0);
        }}
        className="backToConfig"
        to="/"
      >
        Back to Configuration
      </Link>
    </div>
  );
};

export default EndGame;
