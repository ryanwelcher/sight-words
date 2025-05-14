import React, { useState } from "react";

const WordInput = ({ onStartGame }) => {
  const [words, setWords] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const wordList = words.split("\n").filter((word) => word.trim() !== "");
    if (wordList.length > 0) {
      onStartGame(wordList);
    }
  };

  return (
    <div>
      <h2>Enter your words (one per line):</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={words}
          onChange={(e) => setWords(e.target.value)}
          rows="5"
          cols="30"
        />
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
};

export default WordInput;
