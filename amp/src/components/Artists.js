import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../api";

const CLIENT_ID = "c0e9c73676684f3e8d10acc56b94be60";
const REDIRECT_URI = "http://localhost:3000/artists"; // change to app url
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

const grabToken = () => {
  return window.location.hash.substring(1).split('&').reduce((initial, item)=>{
    let parts = item.split("=");
    initial[parts[0]] = decodeURIComponent(parts[1]);
    return initial
  }, {});
};

const Artists = () => {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    const tokenData = grabToken();
    setToken(tokenData);
  }, []);

  const normalize = text => {
    return text.replace(/ /g, '-');
  };

  const handleArtistPrompt = async (artistId, artistName) => {
    if (!token) {
      console.error("No valid token found.");
      return;
    }

    try {
      setLoadingAudio(true);
      const generateEndpoint = `/generate/${normalize(artistName)}`;
      const response = await api.get(generateEndpoint, { responseType: "blob" });

      const url = URL.createObjectURL(response.data);
      setFileUrl(url);
    } catch (error) {
      console.error("Error generating audio: ", error);
    } finally {
      setLoadingAudio(false);
    }
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    if (!token) {
      console.error("No valid token found.");
      return;
    }
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token.access_token}`, // Use the access token
        },
        params: {
          q: searchKey,
          type: "artist",
        },
      });
      setArtists(data.artists.items);
    } catch (error) {
      console.error("Error searching for artists:", error);
    }
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id} style={{ marginBottom: '20px' }}>
        <div>
          {artist.images.length ? (
            <img width={"75%"} src={artist.images[0].url} alt={artist.name} />
          ) : (
            <div>No Image</div>
          )}
        </div>
        <div style={{ marginTop: '10px' }}>
          <p>{artist.name}</p>
          <button onClick={() => handleArtistPrompt(artist.id, artist.name)}>Generate with {artist.name}</button>
        </div>
      </div>
    ));
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify Login</h1>
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
        {token ? (
          <div>
            <form onSubmit={searchArtists}>
              <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
              <button type={"submit"}>Search</button>
            </form>
            {renderArtists()}
          </div>
        ) : (
          <h2>Please login</h2>
        )}
        {loadingAudio && <p>Loading...</p>}
        {fileUrl && (
          <div>
            <audio controls>
              <source src={fileUrl} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
            <p>Download your generated file:</p>
            <a href={fileUrl} download="generated_file.wav">Download File</a>
          </div>
        )}
        <h3><a href="/">Return to Home</a></h3>
      </header>
    </div>
  );
};

export default Artists;
