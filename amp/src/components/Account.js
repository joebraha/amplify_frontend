import React from "react"; 
// importing Link from react-router-dom to navigate to  
// different end points. 
import { Link } from "react-router-dom"; 
import "../App.css";

const Account = () => { 
  return ( 
    <div className="App">
      <header className="App-header"> 
      <h1>Account</h1> 
      <br /> 
      <ul>  
        {/* Endpoint to route to Login component */} 
        <Link to="/login">Login</Link>
        <br />
        {/* Endpoint to route to Login component */} 
        <Link to="/createaccount">Create Account</Link>
        <br />
        {/* Endpoint to route to Saved Playlists component */} 
        <Link to="/playlists">See Saved Playlists</Link>    
        <br />
        {/* Endpoint to route to Home component */} 
        <Link to="/">Home</Link> 
      </ul>
      </header> 
    </div> 
  ); 
}; 
  
export default Account; 