import React, { useState } from "react"; 
// importing Link from react-router-dom to navigate to  
// different end points. 
import { Link } from "react-router-dom"; 
import api from '../api'
import "../App.css";  


//Todo: fill in with contact information
const CreateAccount = () => { 
    const [loginData, setLoginData] = useState({
      user_id: "",
      password: "",
      library_id: "",
      phone_number: ""
  });

//   const fetchUser = async () => {
//     const response = await api.get("/get")
//   };
  
  const handleInputChange = (event) => {
    const value = event.target.value;
    // const { name , value }  = event.target;

    // Validate if the input is an integer for "user_id" and "library_id"
    // if ((name === "user_id" || name === "library_id") && !(/^\d+$/.test(value))) {
    //   // Display an error message or handle the validation error as needed
    //   console.error(`Invalid input for ${name}: ${value}`);
    //   return;
    // }

    setLoginData({
        ...loginData,
        [event.target.value]: value,
    });
  };

  const handleChangeUser = async (event) => {
    event.preventDefault();

    try {
      // const response = await api.post("http://localhost:8000/CreateAccount",loginData);
      await fetch('http://localhost:8000/CreateAccount', { method: 'POST', mode: 'no-cors', body: loginData });
      // console.log("User created successfully:", response.data);
      console.log("User created successfully:");
      // Clear the form after successful submission
      setLoginData({
        user_id: "",
        password: "",
        library_id: "",
        phone_number: ""
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return ( 
    <div className = "App">
      <header className = "App-header">
      <h1>CreateAccount</h1> 
      <br /> 
      <form onSubmit={handleChangeUser}> {/* send to backend */}
            <p>Username:</p>
            <input type="text" onChange={handleInputChange} value = {loginData.user_id}/>
            <p>Password:</p>
            <input type="text" onChange={handleInputChange} value = {loginData.password}/>
            <p>library_id:</p>
            <input type="text" onChange={handleInputChange} value = {loginData.library_id}/>
            <p>Phone Number:</p>
            <input type="text" onChange={handleInputChange} value = {loginData.phone_number}/>
            <button type="submit" value="Submit">
                Submit
            </button>
        </form>
      <u>
        <p></p>
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

export default CreateAccount;