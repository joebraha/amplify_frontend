import React, { useState, useEffect } from "react"; 
// importing Link from react-router-dom to navigate to  
// different end points. 
import { Link } from "react-router-dom"; 
import api from '../api'
import "../App.css";
  


//Todo: fill in with contact information
const Login = () => { 
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  let result = {};

  const formSubmit = async (event) => {
    event.preventDefault();
    console.log("submitting...")
    result = await fetch('http://localhost:8000', {mode: 'no-cors'});
    setUser("");
    setPass("");
    console.log(result);
  }
  const handleChangeUser = (event) => {
    setUser(event.target.value);
  }
  const handleChangePass = (event) => {
    setPass(event.target.value);
  }

  return ( 
    <div className = "App">
      <header className = "App-header">
      <h1>Login</h1> 
      <br /> 
      <form onSubmit={formSubmit}> {/* send to backend */}
            <p>Username:</p>
            <input type="text" value={username} onChange={handleChangeUser}/>
            <p>Password:</p>
            <input type="text" value={password} onChange={handleChangePass}/>
            <input type="submit" value="Submit"/>
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
