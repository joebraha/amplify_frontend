import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import audio3 from "../audios/audio3.wav";
import audio4 from "../audios/audio4.wav";

const Playlists = () => {
  const [songs, setSongs] = useState([{ title: "Song 1", url: audio3 }, { title: "Song 2", url: audio4 }]);
  const [isplaying, setisplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [buttonNames, setButtonNames] = useState(["Play", "Play"]);
  const audioRefs = useRef([]);

  useEffect(() => {
    songs.forEach((audio, index) => {
      if (audio.url) {
        audioRefs.current[index] = new Audio(audio.url);
        audioRefs.current[index].addEventListener("canplaythrough", () => {
          const newButtonNames = [...buttonNames];
          newButtonNames[index] = "Play";
          setButtonNames(newButtonNames);
        });
        audioRefs.current[index].onended = () => {
          const newButtonNames = [...buttonNames];
          newButtonNames[index] = "Play";
          setButtonNames(newButtonNames);
        };
      }
    });

    return () => {
      audioRefs.current.forEach((audioRef) => {
        if (audioRef) {
          audioRef.pause();
          audioRef.src = "";
          audioRef.load();
        }
      });
    };
  }, [songs, buttonNames]);

  const handleButtonClick = (index) => {
    const newButtonNames = [...buttonNames];

    if (newButtonNames[index] === "Play") {
      if (audioRefs.current[index].paused) {
        audioRefs.current[index].play().catch((error) => {
          console.error("Error playing audio:", error);
        });
        newButtonNames[index] = "Pause";
      }
    } else {
      audioRefs.current[index].pause();
      newButtonNames[index] = "Play";
    }

    setButtonNames(newButtonNames);
  };

  return (
    <div>
      <h1>Saved Playlists - Audio Player</h1>
      {[...Array(songs.length)].map((_, index) => (
        <div key={index}>
          <button onClick={() => handleButtonClick(index)}>{buttonNames[index]}</button>
        </div>
      ))}
      <li>
        <Link to="/">Return to Home</Link>
      </li>
    </div>
  );
};

export default Playlists;
