import React from "react";
import { Link } from "react-router-dom"; 
import DisplayWav from "./DisplayWav";
import audio1 from "../Player/audios/audio1.wav";
import audio2 from "../Player/audios/audio2.wav";
import audio3 from "../Player/audios/audio3.wav";
import audio4 from "../Player/audios/audio4.wav";

const Playlists = () => {
  const audioFiles = [audio1, audio2, audio3, audio4]
  return (
    <div>
      <h1 className="center">Your Songs</h1>
      <DisplayWav audioFiles={audioFiles} />
      <li className="center"> 
          {/* Endpoint to route to Home Page */} 
          <Link to="/">Return to Home</Link> {}
      </li>
    </div>
  );
};

export default Playlists;
