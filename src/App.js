import React, { useState } from "react";
import Game from "./components/Game";
import { getRandomWords, dolchWords } from "./word-lists";
import "./App.css";

function App() {
  const [gameWords, setGameWords] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [difficulty, setDifficulty] = useState("medium");

  const handleLevelSelect = (level) => {
    let words;
    let pairCount;

    switch (difficulty) {
      case "easy":
        pairCount = 4;
        words = getRandomWords(level, pairCount);
        break;
      case "medium":
        pairCount = 8;
        words = getRandomWords(level, pairCount);
        break;
      case "hard":
        pairCount = 12;
        words = getRandomWords(level, pairCount);
        break;
      case "master":
        words = dolchWords[level];
        pairCount = words.length;
        break;
      default:
        pairCount = 8;
        words = getRandomWords(level, pairCount);
    }

    setGameWords(words);
    setGameStarted(true);
    setSelectedLevel(level);
  };

  const handleRestart = () => {
    setGameStarted(false);
    setGameWords([]);
    setSelectedLevel("");
  };

  const handleDifficultySelect = (level) => {
    setDifficulty(level);
  };

  const getLevelNumber = (level) => {
    const levelMap = {
      prePrimer: 1,
      primer: 2,
      firstGrade: 3,
      secondGrade: 4,
      thirdGrade: 5,
    };
    return levelMap[level] || "";
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      {!gameStarted ? (
        <div className="level-selection">
          <h2>Select Difficulty</h2>
          <div className="difficulty-buttons">
            <button
              className={difficulty === "easy" ? "selected" : ""}
              onClick={() => handleDifficultySelect("easy")}
              aria-label="Easy difficulty"
            >
              <img
                src="https://m.media-amazon.com/images/I/31olIWRlnCL._AC_SY1000_.jpg"
                alt="creeper"
              />
            </button>
            <button
              className={difficulty === "medium" ? "selected" : ""}
              onClick={() => handleDifficultySelect("medium")}
              aria-label="Medium difficulty"
            >
              <img
                src="https://m.media-amazon.com/images/I/31olIWRlnCL._AC_SY1000_.jpg"
                alt="creeper"
              />
              <img
                src="https://m.media-amazon.com/images/I/31olIWRlnCL._AC_SY1000_.jpg"
                alt="creeper"
              />
            </button>
            <button
              className={difficulty === "hard" ? "selected" : ""}
              onClick={() => handleDifficultySelect("hard")}
              aria-label="Hard difficulty"
            >
              <img
                src="https://m.media-amazon.com/images/I/31olIWRlnCL._AC_SY1000_.jpg"
                alt="creeper"
              />
              <img
                src="https://m.media-amazon.com/images/I/31olIWRlnCL._AC_SY1000_.jpg"
                alt="creeper"
              />
              <img
                src="https://m.media-amazon.com/images/I/31olIWRlnCL._AC_SY1000_.jpg"
                alt="creeper"
              />
            </button>
            <button
              className={difficulty === "master" ? "selected" : ""}
              onClick={() => handleDifficultySelect("master")}
              aria-label="Master difficulty"
            >
              <img
                src="https://m.media-amazon.com/images/I/31olIWRlnCL._AC_SY1000_.jpg"
                alt="creeper"
              />
              <img
                src="https://m.media-amazon.com/images/I/31olIWRlnCL._AC_SY1000_.jpg"
                alt="creeper"
              />
              <img
                src="https://m.media-amazon.com/images/I/31olIWRlnCL._AC_SY1000_.jpg"
                alt="creeper"
              />
              <img
                src="https://m.media-amazon.com/images/I/31olIWRlnCL._AC_SY1000_.jpg"
                alt="creeper"
              />
            </button>
          </div>
          <h2>Select a Level</h2>
          <div className="level-buttons">
            <button onClick={() => handleLevelSelect("prePrimer")}>
              Level 1
            </button>
            <button onClick={() => handleLevelSelect("primer")}>Level 2</button>
            <button onClick={() => handleLevelSelect("firstGrade")}>
              Level 3
            </button>
            <button onClick={() => handleLevelSelect("secondGrade")}>
              Level 4
            </button>
            <button onClick={() => handleLevelSelect("thirdGrade")}>
              Level 5
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button
            className="back-button"
            onClick={handleRestart}
            aria-label="Back to menu"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>
          <h3>
            Difficulty:{" "}
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </h3>
          <Game words={gameWords} onRestart={handleRestart} />
        </div>
      )}
    </div>
  );
}

export default App;
