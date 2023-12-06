import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAddressCard, faSearch, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import DisplayWav from "./DisplayWav";
import audio1 from "../Player/audios/audio1.wav";
import audio2 from "../Player/audios/audio2.wav";
import audio3 from "../Player/audios/audio3.wav";
import audio4 from "../Player/audios/audio4.wav";

// api fetch calls 
import axios from 'axios';

const Home = () => {
  // const audioFiles = [audio1, audio2, audio3, audio4];
  const [audioFiles, setAudioFiles] = useState([]);
  
  useEffect(() => {
    axios.get('/api/post_recent_music')
    .then((response) => {
      setAudioFiles(response.data)
    })
    .catch((error) => {
      console.log("error getting wav files: ", error)
    });
  },[]);

  return (
    <div className="container">
      <h1 className="center">Amplify</h1>
      <div className="toolbar">
        <Link to="/spotify" className="toolbar-link" data-text="Spotify Login">
          <FontAwesomeIcon icon={faSpotify} beat size="2xl" style={{ color: "#1aa23c" }} />
        </Link>
        <Link to="/artists" className="toolbar-link" data-text="Artist Lookup">
          <FontAwesomeIcon icon={faSearch} size="2xl" style={{ color: "#e2761d" }} />
        </Link>
        <Link to="/prompt" className="toolbar-link" data-text="Prompt-Based Generation">
          <FontAwesomeIcon icon={faPenToSquare} size="2xl" style={{ color: "#3135aa" }} />
        </Link>
        <Link to="/account" className="toolbar-link" data-text="Account">
          <FontAwesomeIcon icon={faUser} size="2xl" style={{ color: "#3498db" }} />
        </Link>
        <Link to="/contactus" className="toolbar-link" data-text="Contact Us">
          <FontAwesomeIcon icon={faAddressCard} size="2xl" style={{ color: "#e74c3c" }} />
        </Link>
      </div>
      <h1>See the most recent songs made by Amplify users !</h1>
      <DisplayWav audioFiles={audioFiles} />
      <footer className="footer">
        <p>Explore our website for exciting music creation features and other user's content!</p>
        <p>&copy; 2023 Amplify System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
