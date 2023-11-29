import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import audios from "../audios/audios";
// import { index } from 'react-native'; 

// Import audio files
import audio3 from "../audios/audio3.wav";
import audio4 from "../audios/audio4.wav";
// import audio3 from "/Users/emmawilkins/Desktop/amplify_frontend/audios/audio3.wav";
// import audio4 from "/Users/emmawilkins/Desktop/amplify_frontend/audios/audio4.wav";

const Playlists = () => {
  const [buttonNames, setButtonNames] = useState(["Play", "Play"]);
  const audios = [audio3, audio4];
  const audioRefs = new Array(2).fill(null);

  const handleButtonClick = (index) => {
    const newButtonNames = [...buttonNames];
    if (newButtonNames[index] === "Play") {
      audioRefs[index].play();
      newButtonNames[index] = "Pause";
    } else {
      audioRefs[index].pause();
      newButtonNames[index] = "Play";
    }
    setButtonNames(newButtonNames);
  };

  // const handleFileChange = (e, index) => {
  //   if (e.target.files[0]) {
  //     const newAudios = [...audios];
  //     newAudios[index] = URL.createObjectURL(e.target.files[0]);
  //     setAudios(newAudios);
  //   }
  // };

  useEffect(() => {
    audios.forEach((audio, index) => {
      if (audio) {
        audioRefs[index] = new Audio(audio);
        audioRefs[index].onended = () => {
          const newButtonNames = [...buttonNames];
          newButtonNames[index] = "Play";
          setButtonNames(newButtonNames);
        };
      }
    });
    // Cleanup function to release resources when component unmounts
    return () => {
      audioRefs.forEach((audioRef) => {
        if (audioRef) {
          audioRef.pause();
          audioRef.src = "";
          audioRef.load();
        }
      });
    };
  }, [audios, buttonNames]);

  return (
    <div>
      <h1>Saved Playlists - Audio Player</h1>
      {[...Array(5)].map((_, index) => (
        <div key={index}>
          <button onClick={() => handleButtonClick(index)}>{buttonNames[index]}</button>
          {/* <input type="file" onChange={(e) => handleFileChange(e, index)} /> */}
        </div>
      ))}
      <li>
        <Link to="/">Return to Home</Link>
      </li>
    </div>
  );
};

export default Playlists;


// //TODO: Fill with saved playlists
// const Playlists = () => { 


//   return ( 
//     <div> 
//       <h1>Saved Playlists</h1> 
//       <br /> 
//       <ul>
//       </ul>
//       <li> 
//           {/* Endpoint to route to Home Page */} 
//           <Link to="/">Return to Home</Link> {}
//       </li>
//     </div> 
//   ); 
// }; 
  
// export default Playlists; 