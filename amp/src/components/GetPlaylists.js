import React, { useEffect, useState } from "react";
import axios from "axios";

const CLIENT_ID = "YOUR_SPOTIFY_CLIENT_ID";
const REDIRECT_URI = "YOUR_REDIRECT_URI";
const AUTH_ENDPOINT = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&show_dialog=true`;
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

const SpotifyGetPlaylists = () => {
    const [accessToken, setAccessToken] = useState("");
    const [playlists, setPlaylists] = useState([]);
  
    useEffect(() => {
      const url = window.location.href;
      const _accessToken = url.match(/#(?:access_token)=([\S\s]*?)&/)?.[1] || "";
  
      if (_accessToken) {
        setAccessToken(_accessToken);
        fetchPlaylists(_accessToken);
      }
    }, []);
  
    const fetchPlaylists = async (token) => {
      try {
        const response = await axios.get(PLAYLISTS_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const playlistsData = response.data.items || [];
        const playlistsWithGenres = await Promise.all(
          playlistsData.map(async (playlist) => {
            try {
              const tracksResponse = await axios.get(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
  
              const trackItems = tracksResponse.data.items || [];
              const genres = new Set();
  
              await Promise.all(trackItems.map(async (track) => {
                const artists = track.track.artists || [];
                await Promise.all(artists.map(async (artist) => {
                  if (artist?.id) {
                    try {
                      const artistResponse = await axios.get(`https://api.spotify.com/v1/artists/${artist.id}`, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      });
  
                      const artistGenres = artistResponse.data.genres || [];
                      artistGenres.forEach((genre) => genres.add(genre));
                    } catch (error) {
                      console.error("Error fetching artist details: ", error);
                    }
                  }
                }));
              }));
  
              const playlistGenres = [...genres];
              const randomGenre = playlistGenres[Math.floor(Math.random() * playlistGenres.length)];
  
              return {
                name: playlist.name,
                genre: randomGenre || "No genres found",
              };
            } catch (error) {
              console.error("Error fetching tracks for playlist: ", error);
              return { name: playlist.name, genre: "No genres found" };
            }
          })
        );
  
        setPlaylists(playlistsWithGenres);
      } catch (error) {
        console.error("Error fetching playlists: ", error);
      }
    };
  
    return (
      <div>
        <h1>Playlists with Random Genre</h1>
        <ul>
          {playlists.map((playlist, index) => (
            <li key={index}>
              <strong>Name: </strong>{playlist.name} <br />
              <strong>Random Genre: </strong>{playlist.genre}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default SpotifyGetPlaylists;