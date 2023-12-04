import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../App.css';

const Prompt = () => {
  const [promptText, setPromptText] = useState("");

  const handlePromptSubmit = (event) => {
    event.preventDefault();

    const apiUrl = ""; // api url from co lab goes here

    // Data to be sent to the server
    const requestData = {
      prompt: promptText
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    })
    .then(response => {
      // response from server - sends back song files
      console.log("Response received:", response);
    })
    .catch(error => {
      console.error("Error sending data:", error);
    });
  };

  const handleInputChange = (event) => {
    setPromptText(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Prompt-Based Generation</h1>
        <br />
        <form onSubmit={handlePromptSubmit}>
          <p>Please type in your song prompt below:</p>
          <input type="text" value={promptText} onChange={handleInputChange} />
          <button type="submit">Submit Prompt</button>
        </form>
        <li>
          <Link to="/">Return to Home</Link>
        </li>
      </header>
    </div>
  );
};

export default Prompt;
