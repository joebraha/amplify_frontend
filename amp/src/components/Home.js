
import React, { useState } from "react"; 
// importing Link from react-router-dom to navigate to  
// different end points. 
import { Link } from "react-router-dom"; 
import { useEffect } from "react";
  



const Home = () => { 


  return ( 
    <div> 
      <h1>Home Page</h1> 
      <br /> 
      <ul> 
        <li> 
          {/* Endpoint to route to Home component */} 
          <Link to="/">Home</Link> 
        </li> 
        <li> 
          {/* Endpoint to route to About component */} 
          <Link to="/spotify" >Spotify Login</Link> 
        </li>
        <li> 
          {/* Endpoint to route to Prompt component */} 
          <Link to="/prompt" >Prompt-Based Generation</Link> 
        </li> 
        <li>
          {/* Endpoint to route to Account component */} 
          <Link to="/account" >Account</Link>
        </li>
        <li>
          {/* Endpoint to route to Contact Us component */} 
          <Link to="/contactus">Contact Us</Link> 
        </li>
      </ul> 
    </div> 
  ); 
}; 
  
export default Home; 