import React from "react";
import styled from "styled-components";

import SongSVG from "../assets/song.svg";

const StyledSong = styled.button`
  border-radius: 100%;
  width: 13rem;
  aspect-ratio: 1;
  margin-inline: auto;
  margin-bottom: 30px;
  background-image: url(${SongSVG});
  font-weight: 900;
  font-size: 6rem;
  color: black;
  -webkit-text-fill-color: white; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 5px;
  -webkit-text-stroke-color: black;
  &:hover {
    border: 1px solid red;
  }

  @media (min-width: 70em) {
    width: 5rem;
    font-size: 2rem;
    -webkit-text-stroke-width: 1px;
    margin-bottom: 0px;
  }
`


const Song = ({ name, sound, playSongHandler }) => {
  return (
    <StyledSong
      onClick={() => {
        playSongHandler();
      }}
    >
      {name}
    </StyledSong> // needs onclick event for playing song
  );
};

export default Song;
