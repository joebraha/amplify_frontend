
import React, { useState } from "react"; 
// importing Link from react-router-dom to navigate to  
// different end points. 
import { Link } from "react-router-dom"; 
import { useEffect } from "react";

// have to import to use icons 
// npm install react-icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAddressCard, faSearch, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

// text font 
import WordArt from 'react-wordart';


// import css file
import '../App.css'; // Import your custom CSS file

const Home = () => {
  return (
    <div className="container">
      <h1 className="center"><WordArt text='Amplify' theme={`blues`} fontSize={100} /></h1>
      <div className="toolbar">
        {/* <Link to="/" className="toolbar-link" data-text="Home">
          <FontAwesomeIcon icon={faSpotify} beat size="lg" style={{ color: "#1aa23c" }} />
        </Link> */}
        <Link to="/spotify" className="toolbar-link" data-text="Spotify Login">
          <FontAwesomeIcon icon={faSpotify} beat size="lg" style={{ color: "#1aa23c" }} />
        </Link>
        <Link to="/artists" className="toolbar-link" data-text="Artist Lookup">
          <FontAwesomeIcon icon={faSearch} size="lg" style={{ color: "#e2761d" }} />
        </Link>
        <Link to="/prompt" className="toolbar-link" data-text="Prompt-Based Generation">
          <FontAwesomeIcon icon={faPenToSquare} size="lg" style={{color: "#3135aa",}} />
        </Link>
        <Link to="/account" className="toolbar-link" data-text="Account">
          <FontAwesomeIcon icon={faUser} size="lg" style={{ color: "#3498db" }} />
        </Link>
        <Link to="/contactus" className="toolbar-link" data-text="Contact Us">
          <FontAwesomeIcon icon={faAddressCard} size="lg" style={{ color: "#e74c3c" }} />
        </Link>
      </div>
      <div className="center">
        <p>Explore our website for exciting music creation features and other user's content!</p>
        <footer>
          <p>&copy; 2023 Amplify System. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;

