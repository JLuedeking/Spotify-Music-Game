import React, { useState, useContext, useEffect } from "react";
import { ConfigurationContext } from "../../contextState/Context";
import fetchFromSpotify from "../../services/api";
import styled from "styled-components";
import { Router, useNavigate } from "react-router-dom";
import { Howl, Howler } from "howler";
import Artist from "../../components/Artist";
import Song from "../../components/Song";
import Points from "../../components/Points";
import Guesses from "../../components/Guesses";
import Timer from "../../components/Timer";
import GamePanel from "../../components/GamePanel";
import MusicPlayer from "../../components/MusicPlayer";
import ArtistSelector from "../../components/ArtistSelector";

export default function Game() {
  const [artists, setArtists] = useState({});
  const [songs, setSongs] = useState({});
  const { artistCount, setArtistCount } = useContext(ConfigurationContext);
  const { songCount, setSongCount } = useContext(ConfigurationContext);
  const { selectedGenre, setSelectedGenre } = useContext(ConfigurationContext);
  const { token, setToken } = useContext(ConfigurationContext);
  const { points, setPoints } = useContext(ConfigurationContext);
  const [answerId, setAnswerId] = useState(0);
  const [guesses, setGuesses] = useState(5);
  const navigate = useNavigate();
  const [songIndex, setSongIndex] = useState(0);
  const [soundPlaying, setSoundPlaying] = useState(false);
  let sound = null;
  let artistSongs = [];

  if (songs) {
    // let temp = songs.tracks.filter((track) => track.preview_url);
    // console.log(temp);
    // for (let i = 0; i < songCount; i++) {
    //   artistSongs.push(temp[i].preview_url);
    // }
    // console.log(artistSongs);

    sound = new Howl({
      src: songs[songIndex],
      html5: true,
      volume: 0.5
    });
  }

  const playSongHandler = () => {
    setSoundPlaying(!soundPlaying);
    let playing = !soundPlaying;
    console.log(playing);
    if (playing) sound.play();
    if (!playing) Howler.stop();
  };

  useEffect(() => {
    if (songs?.tracks) {
      console.log("stopping");
      Howler.stop();
      setSoundPlaying(false);
      sound = new Howl({
        src: [artistSongs[songIndex]],
        html5: true,
      });
    }
  }, [songIndex, setSongIndex]);

  const indexHandler = (e) => {
    if (e === "+") {
      if (songIndex === parseInt(songCount) - 1) {
        setSongIndex(0);
      } else {
        setSongIndex(songIndex + 1);
      }
    } else if (e === "-") {
      if (songIndex === 0) {
        setSongIndex(songCount - 1);
      } else {
        setSongIndex(songIndex - 1);
      }
    }
  };

  // To Do: Potentially merge the two fetch functions below, and set artists only once confirmed
  // that none of the songs are undefined or null. Otherwise, it causes the buttons to render
  // multiple times on the screen to create a bit of a glitchy experience.

  const fetchArtists = async (selectedGenre, artistCount) => {
    let checkTotal = await fetchFromSpotify({
      token: token,
      endpoint: `search?q=genre:${selectedGenre}&type=artist`,
    }).catch((err) => console.log(err));

    // Getting an offset within the range of the total artists, capped at 500.
    const offSet = checkTotal.artists.total > 200 ? 200 : checkTotal.artists.total;

    const randomOffset = Math.floor(Math.random() * offSet);
    let response = await fetchFromSpotify({
      token: token,
      endpoint: `search?q=genre:${selectedGenre}&type=artist&offset=${randomOffset}&limit=${artistCount}`,
    }).catch((err) => console.log(err));
    console.log("artists: ", response);
    setArtists(response);
  };

  const fetchSongs = async (artistId) => {
    let response = await fetchFromSpotify({
      token,
      endpoint: `artists/${artistId}/top-tracks?country=US`,
    }).catch((err) => console.log(err));
    console.log("songs", response);

    let songList = response.tracks.map((song) => song.preview_url);
      console.log("Song List: ", songList);
      let updatedSongs = [];

      for (let i = 0; i < songList.length; i++)
      {
        if (songList[i] !== undefined && songList[i] !== null){
          updatedSongs.push(songList[i])
        }
      }

      if (updatedSongs.length < songCount) fetchArtists(selectedGenre, artistCount);

      // Randomize songs
      for (let i = 0; i < updatedSongs.length; i++) {
        const randomTrackPosition = Math.floor(Math.random() * updatedSongs.length - 1);
        let temp = updatedSongs[randomTrackPosition];
        updatedSongs[randomTrackPosition] = updatedSongs[i];
      }

      console.log("Updated Songs: ", updatedSongs);

    setSongs(updatedSongs)
  };

  useEffect(() => {
    async function fetchData() {
      await fetchArtists(selectedGenre, artistCount);
    }
    // console.log(selectedGenre);
    if (selectedGenre && artistCount) fetchData();
  }, [selectedGenre, setSelectedGenre, artistCount, setArtistCount]);

  useEffect(() => {
    let randomNum = Math.floor(Math.random() * artistCount);
    setAnswerId(artists?.artists?.items[randomNum].id);
    async function fetchData() {
      await fetchSongs(artists?.artists?.items[randomNum].id);
    }
    fetchData();
  }, [artists, setArtists]);

  // Checks the incoming artist.id against the AnswerID to determine if correct
  const checkAnswer = (artistID) => {
    if (artistID === answerId) {
      console.log("Correct Artist");
      setPoints(points + 1);
    } else {
      console.log("Incorrect Artist");
      if (guesses > 1) {
        setGuesses(guesses - 1);
      } else if (guesses <= 1) {
        navigate("/score", { state: { score: { points } } });
      }
    }
    Howler.stop();
    fetchArtists(selectedGenre, artistCount);
  };

  const StyledGame = styled.div`
    width: 90%;
    display: block;
    margin: 1rem auto;
    h1 {
      text-align: center;
      margin-bottom: 2rem;
      font-size: 6rem;
    }

    @media (min-width: 70em) {
      width: 600px;
      margin: 4rem auto;
      h1 {
        font-size: 2rem;
      }
    }
 `;

  return (
    <StyledGame>
      <h1>Game Time!</h1>
      <GamePanel>
        <Guesses guessTotal={guesses} />
        <Timer timesUp={() => checkAnswer(null)} />
        <Points pointTotal={points} />
      </GamePanel>
      <MusicPlayer>
        <h2>Song Clips</h2>
        {console.log(artistSongs)}
        {/* <Song
          setSoundPlaying={setSoundPlaying}
          soundPlaying={soundPlaying}
          sound={sound1}
          name="1"
        /> */}
        <button value={"-"} onClick={(e) => indexHandler(e.target.value)}>
          prev
        </button>
        <Song
          sound={sound}
          playSongHandler={playSongHandler}
          name={songIndex + 1}
        />
        <button value={"+"} onClick={(e) => indexHandler(e.target.value)}>
          next
        </button>
        {/* <Song
          setSoundPlaying={setSoundPlaying}
          soundPlaying={soundPlaying}
          sound={sound3}
          name="3"
        /> */}
      </MusicPlayer>

      <ArtistSelector>
        <h2>Select the Artist behind the music</h2>
        {artists?.artists?.items?.map((artist) => (
          <Artist
            key={artist.name + artist.id}
            name={artist.name}
            answer={() => checkAnswer(artist.id)}
          />
        ))}
      </ArtistSelector>
    </StyledGame>
  );
}
