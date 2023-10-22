import React, { useState } from "react"; 
// importing Link from react-router-dom to navigate to  
// different end points. 
import { Link } from "react-router-dom"; 
import { useEffect } from "react";
  



const Account = () => { 


  return ( 
    <div> 
      <h1>Account</h1> 
      <br /> 
      <ul> 
        <li> 
          {/* Endpoint to route to Home component */} 
          <Link to="/">Home</Link> 
        </li> 
        <li> 
          {/* Endpoint to route to Saved Playlists component */} 
          <Link to="/playlists">See Saved Playlists</Link> 
        </li>
        {/* expand to include: friends, ...  */}
          
      </ul> 
    </div> 
  ); 
}; 
  
export default Account; 