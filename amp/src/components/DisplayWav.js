import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const DisplayWav = ({ audioFiles }) => {
  const audioElems = useRef(audioFiles.map(() => React.createRef()));
  const [isplaying, setisplaying] = useState(new Array(audioFiles.length).fill(false));

  const handlePlayPause = (index) => {
    const updatedPlaying = [...isplaying];
    const audioElem = audioElems.current[index].current;

    if (!isplaying[index]) {
      audioElem.play().catch((error) => {
        console.error(`Error playing audio ${index + 1}:`, error);
      });
    } else {
      audioElem.pause();
    }
    updatedPlaying[index] = !isplaying[index];
    setisplaying(updatedPlaying);
  };

  return (
    <div className="button-container">
      <div className="button-grid">
        {audioFiles.map((audioFile, index) => (
          <div className="button-row" key={index}>
            <audio src={audioFile} ref={audioElems.current[index]} />
            <button className="audio-button" onClick={() => handlePlayPause(index)}>
              <FontAwesomeIcon icon={faMusic} size="2x" style={{ color: "#e2761d" }} />
              {isplaying[index] ? "Pause" : "Play"} Audio {index + 1}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayWav;
