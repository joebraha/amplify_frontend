// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import '../App.css';

const CLIENT_ID = "c0e9c73676684f3e8d10acc56b94be60"
const REDIR_URI = "http://localhost:3000/" // TODO: add url/spotify to redirect_url allow list
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"


function grabToken () {
    return window.location.hash.substring(1).split('&').reduce((initial, item)=>{
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial
    }, {});
  }


function LoginSpotify() {
  // let [awaitingToken, setAwaitingToken] = useState(false);

  useEffect(() => {
    const token = grabToken();
    if(token) {
      //send token to backend
      console.log(token); // TODO: called twice for some reason
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify React</h1>
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIR_URI}&response_type=${RESPONSE_TYPE}`}>Login
                  to Spotify</a>
      </header>
    </div>
  );
}

export default LoginSpotify;
