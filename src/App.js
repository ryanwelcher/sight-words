import React, { useState } from "react";
import Game from "./components/Game";
import { getRandomWords, dolchWords } from "./word-lists";
import "./App.css";

function App() {
  const [gameWords, setGameWords] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [pairCount, setPairCount] = useState("8");

  const handleLevelSelect = (level) => {
    let words;
    if (pairCount === "all") {
      // Use all words from the level
      words = dolchWords[level];
    } else {
      // Get random words based on selected pair count
      words = getRandomWords(level, parseInt(pairCount));
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

  const handlePairCountChange = (e) => {
    setPairCount(e.target.value);
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      {!gameStarted ? (
        <div className="level-selection">
          <h2>Select a Level</h2>
          <div className="pair-count-selection">
            <label htmlFor="pairCount">Number of Pairs:</label>
            <select
              id="pairCount"
              value={pairCount}
              onChange={handlePairCountChange}
            >
              <option value="4">4 Pairs</option>
              <option value="8">8 Pairs</option>
              <option value="12">12 Pairs</option>
              <option value="all">All Words</option>
            </select>
          </div>
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
          <h3>Pairs: {pairCount === "all" ? "All Words" : pairCount}</h3>
          <Game words={gameWords} onRestart={handleRestart} />
        </div>
      )}
    </div>
  );
}

export default App;
