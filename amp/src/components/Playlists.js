import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import DisplayWav from "./DisplayWav";
import audio1 from "../Player/audios/audio1.wav";
import audio2 from "../Player/audios/audio2.wav";
import audio3 from "../Player/audios/audio3.wav";
import audio4 from "../Player/audios/audio4.wav";

// api fetch calls 
import api from "../api";

const Playlists = () => {
  // below is to be used when Api connection is ready 
  const [audioFiles, setAudioFiles] = useState([]);
  
  useEffect(() => {
    api.get('/api/post_user_playlist')
    .then((response) => {
      setAudioFiles(response.data)
    })
    .catch((error) => {
      console.log("error getting wav files: ", error)
    });
  },[]);

  return (
    <div>
      <h1 className="center">Your Songs</h1>
      <DisplayWav audioFiles={audioFiles} />
      <br />
      <h2 className="center">
        <Link to="/">Return to Home</Link> {}
      </h2>
    </div>
  );
};

export default Playlists;
