import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginSpotify from './components/LoginSpotify';
import Home from './components/Home';


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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
