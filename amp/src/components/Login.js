import React, { useState } from "react"; 
// importing Link from react-router-dom to navigate to  
// different end points. 
import { Link } from "react-router-dom"; 
import { useEffect } from "react";
import "../App.css";
  


//Todo: fill in with contact information
const Login = () => { 
  return ( 
    <div className = "App">
      <header className = "App-header">
      <h1>Login</h1> 
      <br /> 
      <form action="/" method="GET"> {/* send to backend */}
            <p>Username:</p>
            <input type="text"/>
        </form>
        <br />
        <form action="/" method="GET"> {/* send to backend */}
            <p>Password:</p>
            <input type="text"/>
        </form>
      <u>
        <p>amplifyb36@gmail.com</p>
      </u>
      <li> 
          {/* Endpoint to route to Home Page */} 
          <Link to="/">Return to Home</Link> {}
      </li>
      </header>
    </div> 
  ); 
}; 

export default Login;