import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginSpotify from './components/LoginSpotify';
import Home from './components/Home';
import Prompt from './components/Prompt';
import Account from './components/Account';
import Playlists from './components/Playlists';
import ContactUs from './components/ContactUs';


const Navbar = () => {
  return (
    <>
      <a href="/components/login_spotify" >Login to Spotify</a>
    </>
  )
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/spotify" element={<LoginSpotify/>}/>
        <Route path="/prompt" element={<Prompt/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/playlists" element={<Playlists/>}/>
        <Route path="/contactus" element={<ContactUs/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
