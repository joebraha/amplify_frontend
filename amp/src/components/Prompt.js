import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../App.css';

const Prompt = () => {
  const [promptText, setPromptText] = useState("");
  const [fileUrl, setFileUrl] = useState(null);

  const normalize = text => {
    return text.replace(/ /g, '-');
  };

  const handlePromptSubmit = async (event) => {
    event.preventDefault();

    const apiUrl = `http://localhost:8000/generate/${normalize(promptText)}`;

    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setFileUrl(url);
      } else {
        console.error("Error generating file:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
        {fileUrl && (
          <div>
            <audio controls>
              <source src={fileUrl} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
            <p>Download your generated file:</p>
            <a href={fileUrl} download="generated_file.wav">Download File</a>
          </div>
        )}
        
        <Link to="/">Return to Home</Link>
      </header>
    </div>
  );
};

export default Prompt;
