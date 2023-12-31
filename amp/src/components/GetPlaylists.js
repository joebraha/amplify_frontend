import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../api";

const CLIENT_ID = "YOUR_SPOTIFY_CLIENT_ID";
const REDIRECT_URI = "localhost/spotify"; // change to app url
const AUTH_ENDPOINT = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&show_dialog=true`;
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

const SpotifyGetPlaylists = () => {
  const [accessToken, setAccessToken] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);

  const normalize = text => {
    return text.replace(/ /g, '-');
  };

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
              genre: randomGenre,
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

    const handleGenreClick = async (genre) => {
      // Perform actions with the clicked genre - make API requests, etc.
      try {
        setLoadingAudio(true); // Set loading to true when generating audio
        const response = await api.get(`/generate/${normalize(genre)}`, {
          responseType: 'blob'
        });
  
        const url = URL.createObjectURL(response.data);
        setFileUrl(url);
      } catch (error) {
        console.error("Error generating audio: ", error);
      } finally {
        setLoadingAudio(false); // Set loading to false after receiving response or error
      }
    };



  return (
    <div>
      <h1>click your playlist to create a song based on its content</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {playlists.map((playlist, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            {/* <strong>Name: </strong>{playlist.name} <br /> */}
            <button onClick={() => handleGenreClick(playlist.genre)} style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer', textDecoration: 'underline', color: "#61dafb", fontSize: "23px"}}>
              {playlist.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default SpotifyGetPlaylists;
