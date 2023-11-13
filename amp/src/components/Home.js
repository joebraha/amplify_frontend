
import React, { useState } from "react"; 
// importing Link from react-router-dom to navigate to  
// different end points. 
import { Link } from "react-router-dom"; 
import { useEffect } from "react";

// have to import to use icons 
// npm install react-icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';


const Home = () => {
  return (
    <div>
      <h1>Amplify</h1>
      <nav>
        <ul>
          {/* <li>
            <Link to="/">Home</Link>
          </li> */}
          <li>
            <FontAwesomeIcon icon={faSpotify} beat size="xl" style={{ color: "#1aa23c" }} />
            <Link to="/spotify">Spotify Login</Link>
          </li>
          <li>
            <Link to="/artists">Artist Lookup</Link>
          </li>
          <li>
            <Link to="/prompt">Prompt-Based Generation</Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faUser} size="lg" style={{ color: "#3498db" }} />
            <Link to="/account">Account</Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faAddressCard} size="lg" style={{ color: "#e74c3c" }} />
            <Link to="/contactus">Contact Us</Link>
          </li>
        </ul>
      </nav>
      <p>Explore our website to create your own AI generated music and view others creations!</p>
      <footer>
        <p>&copy; 2023 Amplify. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
