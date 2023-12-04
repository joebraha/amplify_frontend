import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../App.css';

const Prompt = () => {
  const [promptText, setPromptText] = useState("");

  const handlePromptSubmit = async (event) => {
    event.preventDefault();

    const apiUrl = "localhost:8000/generate"; // api url from backend goes here (then backend gets from Colab, saves it, and send it back here)


    await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body: promptText
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
