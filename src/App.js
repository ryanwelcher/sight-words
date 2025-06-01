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
            >
              Easy (4 Pairs)
            </button>
            <button
              className={difficulty === "medium" ? "selected" : ""}
              onClick={() => handleDifficultySelect("medium")}
            >
              Medium (8 Pairs)
            </button>
            <button
              className={difficulty === "hard" ? "selected" : ""}
              onClick={() => handleDifficultySelect("hard")}
            >
              Hard (12 Pairs)
            </button>
            <button
              className={difficulty === "master" ? "selected" : ""}
              onClick={() => handleDifficultySelect("master")}
            >
              Master (All Words)
            </button>
          </div>
          <h2>Select a Level</h2>
          <div className="level-buttons">
            <button onClick={() => handleLevelSelect("prePrimer")}>
              Pre-Primer
            </button>
            <button onClick={() => handleLevelSelect("primer")}>Primer</button>
            <button onClick={() => handleLevelSelect("firstGrade")}>
              First Grade
            </button>
            <button onClick={() => handleLevelSelect("secondGrade")}>
              Second Grade
            </button>
            <button onClick={() => handleLevelSelect("thirdGrade")}>
              Third Grade
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2>Level: {selectedLevel}</h2>
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
