import React, { useState } from "react"; 
// importing Link from react-router-dom to navigate to  
// different end points. 
import { Link, useNavigate } from "react-router-dom"; 
import "../App.css";  


//Todo: fill in with contact information
const CreateAccount = () => { 

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
      username: "",
      password: "",
      email: "",
      phone_number: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setLoginData({
        ...loginData,
        [name]: value,
    });
  };

  const handleChangeUser = async (event) => {

    event.preventDefault();

    try {
      console.log(loginData);
      console.log("Sending request to:", 'http://localhost:8000/CreateAccount/');
      await fetch('http://localhost:8000/CreateAccount/', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)});
      console.log("User created successfully:");
      // Clear the form after successful submission
      setLoginData({
        username: "",
        password: "",
        email: "",
        phone_number: ""
      });
      navigate("/login");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return ( 
    <div className = "App">
      <header className = "App-header">
      <h1>Create Account</h1> 
      <br /> 
      <form onSubmit={handleChangeUser}>
            <p>Username:</p>
            <input type="text" name="username" onChange={handleInputChange} value = {loginData.username}/>
            <p>Password:</p>
            <input type="text" name="password" onChange={handleInputChange} value = {loginData.password}/>
            <p>Email:</p>
            <input type="text" name="email" onChange={handleInputChange} value = {loginData.email}/>
            <p>Phone Number:</p>
            <input type="text" name="phone_number" onChange={handleInputChange} value = {loginData.phone_number}/>
            <button type="submit" value="Submit">
                Submit
            </button>
        </form>
      <u>
        <p></p>
      </u>
      <h2 className="center"> 
          {/* Endpoint to route to Home Page */} 
          <Link to="/">Return to Home</Link> {}
      </h2>
      </header>
    </div> 
  ); 
}; 

export default CreateAccount;