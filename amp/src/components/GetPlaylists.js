// // npm install axios 
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

// const SpotifyGetPlaylists = () => {
//     // state variables to store data that we get from API call (spotify)
//     const [token, setToken] = useState("");
//     const [data, setData] = useState({});

//     // get token this is for stream lining the connection to spotify process
//     useEffect(() => {
//         if (localStorage.getItem("accessToken")) {
//         setToken(localStorage.getItem("accessToken"));
//         }
//     }, []);

//     const handleGetPlaylists = () => {
//         axios
//         .get(PLAYLISTS_ENDPOINT, {
//             headers: {
//             Authorization: "Bearer " + token,
//             },
//         })
//         .then((response) => {
//             setData(response.data);
//         })
//         .catch((error) => {
//             console.log(error);
//         });
//     };

//     return (
//         <>
//         <button onClick={handleGetPlaylists}>Get Playlists</button>
//         {data?.items ? data.items.map((item) => <p>{item.name}</p>) : null}
//         </>
//     );
// };

// export default SpotifyGetPlaylists;

import React, { useEffect, useState } from "react";
import axios from "axios";

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

const SpotifyGetPlaylists = () => {
    // State variables to store data obtained from the API call
    const [token, setToken] = useState("");
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylistTracks, setSelectedPlaylistTracks] = useState([]);

    // Function to fetch playlists from Spotify
    const fetchPlaylists = async () => {
        try {
            const response = await axios.get(PLAYLISTS_ENDPOINT, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPlaylists(response.data.items || []);
        } catch (error) {
            console.error("Error fetching playlists: ", error);
        }
    };

    // Get token from localStorage on component mount
    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    // Function to fetch tracks of a selected playlist
    const getPlaylistTracks = async (playlistId) => {
        try {
            const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSelectedPlaylistTracks(response.data.items || []);
        } catch (error) {
            console.error("Error fetching playlist tracks: ", error);
        }
    };

    return (
        <div>
            <button onClick={fetchPlaylists}>Get Playlists</button>
            <ul>
                {playlists.map((playlist) => (
                    <li key={playlist.id}>
                        <button onClick={() => getPlaylistTracks(playlist.id)}>{playlist.name}</button>
                    </li>
                ))}
            </ul>
            <h2>Selected Playlist Tracks</h2>
            <ul>
                {selectedPlaylistTracks.map((track) => (
                    <li key={track.track.id}>
                        <p>Name: {track.track.name}</p>
                        <p>Track URI: {track.track.uri}</p>
                        <p>Popularity: {track.track.popularity}</p>
                        <p>Album: {track.track.album.name}</p>
                        <p>Main Artist: {track.track.artists[0].name}</p>
                        <p>Artist Popularity: {track.track.artists[0].popularity}</p>
                        <p>Genres: {track.track.artists[0].genres.join(", ")}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SpotifyGetPlaylists;
