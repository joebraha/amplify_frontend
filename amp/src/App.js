import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginSpotify from './components/LoginSpotify';
import Home from './components/Home';
import Prompt from './components/Prompt';
import Account from './components/Account';
import Playlists from './components/Playlists';
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import Artists from './components/Artists';
import CreateAccount from './components/CreateAccount';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/spotify" element={<LoginSpotify/>}/>
        <Route path="/artists" element={<Artists/>}/>
        <Route path="/prompt" element={<Prompt/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/playlists" element={<Playlists/>}/>
        <Route path="/contactus" element={<ContactUs/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/CreateAccount" element={<CreateAccount/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
