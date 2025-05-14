import React, { useState } from "react";
import WordInput from "./components/WordInput";
import Game from "./components/Game";
import "./App.css";

function App() {
  const [gameWords, setGameWords] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = (words) => {
    setGameWords(words);
    setGameStarted(true);
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      {!gameStarted ? (
        <WordInput onStartGame={handleStartGame} />
      ) : (
        <Game words={gameWords} />
      )}
    </div>
  );
}

export default App;
