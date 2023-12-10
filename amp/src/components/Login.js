import React, { useState, useEffect } from "react"; 
// importing Link from react-router-dom to navigate to  
// different end points. 
import { Link, useNavigate } from "react-router-dom"; 
import api from '../api'
import "../App.css";
  
//Todo: fill in with contact information
const Login = () => { 
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
});

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setLoginData({
        ...loginData,
        [name]: value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      console.log(loginData);
      const response = await fetch(`http://localhost:8000/get_user/${loginData.username}`);
      const user = await response.json();

      console.log("User found:", user);
      setLoginData({
        username: "",
        password: "",
      });
      // You can handle the successful login here, e.g., redirect to another page
      navigate("/playlists");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return ( 
    <div className = "App">
      <header className = "App-header">
      <h1>Login</h1> 
      <br /> 
      <form onSubmit={handleLogin}> {/* send to backend */}
            <p>Username:</p>
            <input type="text" name="username" onChange={handleInputChange} value={loginData.username}/>
            <p>Password:</p>
            <input type="text" name="password" onChange={handleInputChange} value={loginData.password}/>
            <input type="submit" value="Submit"/>
        </form>
      <u>
        <p></p>
        </u>
        <u>
          <Link to="../CreateAccount">Create Account</Link>
        </u>
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
