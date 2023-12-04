import React, { useEffect } from "react";
import GetPlaylists from "./GetPlaylists";
import '../App.css';
import { Link } from "react-router-dom"; 

const CLIENT_ID = "c0e9c73676684f3e8d10acc56b94be60";
const REDIR_URI = "http://localhost:3000/spotify";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulator[key] = value;
    return accumulator;
  }, {});

  return paramsSplitUp;
};

const LoginSpotify = () => {
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash);

      // Send the token to your backend here
      sendTokenToBackend(access_token);
    }
  }, []);

  const sendTokenToBackend = (token) => {
    // Send a POST request to your backend endpoint /api/login
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }), // Sending the token in the request body
    })
    .then(response => {
      // Handle the response from the backend if needed
      console.log(response);
    })
    .catch(error => {
      // Handle any errors that occur during the fetch operation
      console.error('Error:', error);
    });
  };

  const handleLogin = () => {
    window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIR_URI}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify Login</h1>
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIR_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
        {/* Endpoint to route to Home Page */} 
        <Link to="/">Return to Home</Link>
        <GetPlaylists />
      </header>
    </div>
  );
};

export default LoginSpotify;
