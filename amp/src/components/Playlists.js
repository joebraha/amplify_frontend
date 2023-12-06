import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Player from "../Player/Player";
import audio1 from "../Player/audios/audio3.wav";
import audio2 from "../Player/audios/audio4.wav";

const Playlists = () => {
  const audio_arr = [audio1, audio2]
  const [songs, setSongs] = useState(audio_arr);
  const [isplaying, setisplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songs[0]);

  const audioElem = useRef(); 

  useEffect(() => {
    if(isplaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [isplaying, currentSong]);

  const onPlay = () => {
    const duration = audioElem.current.duration;
    const currentTime = audioElem.current.currentTime;

    setCurrentSong({...currentSong, "progress": currentTime/duration * 100, "length": duration}); 
  }

  return (
    <div>
      <h1>Saved Playlists - Audio Player</h1>
      {/* Fix the event name here, change onPlaying to onPlay */}
      <audio src={currentSong.url} ref={audioElem} onTimeUpdate={onPlay} />
      <Player songs={songs} setSongs={setSongs} isplaying={isplaying} setisplaying={setisplaying} audioElem={audioElem} currentSong={currentSong} setCurrentSong={setCurrentSong} />
      <li>
        <Link to="/">Return to Home</Link>
      </li>
    </div>
  );
};

export default Playlists;
