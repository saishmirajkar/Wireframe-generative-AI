import React, { useState } from "react";
import Backend from "./Backend";

const Frontend = () => {
  const [inputText, setInputText] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorr, setErrorr] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await Backend.handleSubmit(event);
      setImageURL(imageUrl);
      setLoading(false);
      setErrorr(false);
    } catch (error) {
        setErrorr(true);
        console.error('Error generating image:', error.message);
    }
  };

  return (
    <div>
      <h2>Frontend</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your prompt here..."
        />
        <button type="submit">Generate</button>
      </form>
      <div>
      {loading && <div className="loading">Loading...</div>}
      {!errorr && !loading && imageURL && (
        <div>
          <h3>Generated Image:</h3>
          <img src={imageURL} alt="Generated Art" />
        </div>
      )}
      { errorr && (
        <div>
            <h1>Server Error</h1>
            </div>
      )}
      </div>
    </div>
  );
};

export default Frontend;
