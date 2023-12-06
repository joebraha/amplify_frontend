import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../App.css';

const Prompt = () => {
  const [promptText, setPromptText] = useState("");
  // const [fileUrl, setFileUrl] = useState(null);
  // test fileUrl
  const [fileUrl, setFileUrl] = useState("/Users/emmawilkins/Desktop/amplify_frontend/amp/src/Player/audios/audio1.wav");

  const normalize = text => {
    return text.replace(/ /g, '-');

  };

  const handlePromptSubmit = async (event) => {
    event.preventDefault();

    const apiUrl = `http://localhost:8000/generate/${normalize(promptText)}`; // api url from backend goes here (then backend gets from Colab, saves it, and send it back here)

    // formData = new FormData()
    // formData.append('input', promptText)

    // Make a request to the backend
    await fetch(apiUrl + normalize(promptText))
      .then(async (response) => {
        if (response.ok) {
          const blob = await response.blob(); // Get the response as a blob
          const url = URL.createObjectURL(blob); // Create a URL for the blob
          setFileUrl(url); // Set the URL in state to display the file
        } else {
          console.error("Error generating file:", response.statusText);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
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
        {fileUrl && (
          <div>
            <audio controls>
              <source src={fileUrl} type="audio/wav" />
              browser does not support the audio element.
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
