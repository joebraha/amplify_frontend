import logo from './logo.svg';
import './App.css';

const CLIENT_ID = "c0e9c73676684f3e8d10acc56b94be60"
const REDIR_URI = "http://localhost:3000"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

function App() {
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

export default App;
