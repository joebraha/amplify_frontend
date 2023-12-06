import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Player from "../Player/Player";
import audio1 from "../Player/audios/audio3.wav";
import audio2 from "../Player/audios/audio4.wav";

const Playlists = () => {
  const [isplaying1, setisplaying1] = useState(false);
  const [isplaying2, setisplaying2] = useState(false);

  const audioElem1 = useRef();
  const audioElem2 = useRef();

  const handlePlayPause1 = () => {
    if (!isplaying1) {
      audioElem1.current.play().catch((error) => {
        console.error("Error playing audio 1:", error);
      });
    } else {
      audioElem1.current.pause();
    }
    setisplaying1(!isplaying1);
  };

  const handlePlayPause2 = () => {
    if (!isplaying2) {
      audioElem2.current.play().catch((error) => {
        console.error("Error playing audio 2:", error);
      });
    } else {
      audioElem2.current.pause();
    }
    setisplaying2(!isplaying2);
  };

  return (
    <div>
      <h1>Saved Playlists - Audio Players</h1>
      <div>
        <audio src={audio1} ref={audioElem1} />
        <button onClick={handlePlayPause1}>
          {isplaying1 ? "Pause" : "Play"} Audio 1
        </button>
      </div>
      <div>
        <audio src={audio2} ref={audioElem2} />
        <button onClick={handlePlayPause2}>
          {isplaying2 ? "Pause" : "Play"} Audio 2
        </button>
      </div>
      {/* You can add additional logic or components as needed */}
      <li>
        <Link to="/">Return to Home</Link>
      </li>
    </div>
  );
};

export default Playlists;
