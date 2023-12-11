import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../App.css';
import api from "../api";

const Prompt = () => {
  const [promptText, setPromptText] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage loading

  const normalize = text => {
    return text.replace(/ /g, '-');
  };

  const handlePromptSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when submitting

    try {
      const response = await api.get(`/generate/${normalize(promptText)}`, {
        responseType: 'blob'
      });

      const url = URL.createObjectURL(response.data);
      setFileUrl(url);
    } catch (error) {
      console.log("Error getting wav files: ", error);
    } finally {
      setLoading(false); // Set loading to false after receiving response or error
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
        {loading && <p>Loading...</p>}
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
