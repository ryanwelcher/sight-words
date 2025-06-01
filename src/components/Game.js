import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Game.css";
import confetti from "canvas-confetti";

const Game = ({ words, onRestart }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [finalChallenge, setFinalChallenge] = useState(null);
  const [disabledPairs, setDisabledPairs] = useState([]);
  const [finalChallengeWon, setFinalChallengeWon] = useState(false);
  const [showFinalChallenge, setShowFinalChallenge] = useState(false);

  useEffect(() => {
    // Create pairs of cards from the words
    const cardPairs = [...words, ...words].map((word, index) => ({
      id: index,
      word,
      isFlipped: false,
      isMatched: false,
    }));
    // Shuffle the cards
    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  }, [words]);

  useEffect(() => {
    if (matchedPairs.length === cards.length && cards.length > 0) {
      setGameWon(true);
      // Select a random word for the final challenge
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setFinalChallenge(randomWord);

      // Wait 3 seconds before showing the final challenge
      setTimeout(() => {
        setShowFinalChallenge(true);
        // Announce the final challenge word
        const speech = new SpeechSynthesisUtterance(
          `Find the word ${randomWord}`
        );
        window.speechSynthesis.speak(speech);
      }, 3000);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [matchedPairs, cards.length, words]);

  const handleCardClick = (id) => {
    if (gameWon && finalChallenge && showFinalChallenge) {
      const clickedCard = cards.find((card) => card.id === id);
      if (clickedCard.word === finalChallenge) {
        setFinalChallengeWon(true);
        // Announce success
        const speech = new SpeechSynthesisUtterance(
          "Congratulations! You've completed the final challenge!"
        );
        window.speechSynthesis.speak(speech);
        // Disable all other cards
        const allCardIds = cards.map((card) => card.id);
        setDisabledPairs(allCardIds.filter((cardId) => cardId !== id));
      } else {
        // Announce wrong choice
        const speech = new SpeechSynthesisUtterance("Try again!");
        window.speechSynthesis.speak(speech);
        // Disable the wrong pair
        const wrongPair = cards
          .filter((card) => card.word === clickedCard.word)
          .map((card) => card.id);
        setDisabledPairs([...disabledPairs, ...wrongPair]);
      }
      return;
    }

    if (flippedCards.length === 2) return;
    if (flippedCards.includes(id) || matchedPairs.includes(id)) return;

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find((card) => card.id === firstId);
      const secondCard = cards.find((card) => card.id === secondId);

      if (firstCard.word === secondCard.word) {
        setMatchedPairs([...matchedPairs, firstId, secondId]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handleRestart = () => {
    setCards([]);
    setFlippedCards([]);
    setMatchedPairs([]);
    setGameWon(false);
    setFinalChallenge(null);
    setDisabledPairs([]);
    setFinalChallengeWon(false);
    setShowFinalChallenge(false);
    onRestart();
  };

  return (
    <div className="game">
      {gameWon && (
        <div className="game-status">
          {finalChallengeWon ? (
            <>
              <h2>Congratulations! You've completed the final challenge!</h2>
              <button onClick={handleRestart}>Play Again</button>
            </>
          ) : showFinalChallenge ? (
            <h2>Find the word: {finalChallenge}</h2>
          ) : (
            <h2>Great job! Get ready for the final challenge...</h2>
          )}
        </div>
      )}
      <div className="cards">
        {cards.map((card) => (
          <Card
            key={card.id}
            word={card.word}
            isFlipped={
              flippedCards.includes(card.id) || matchedPairs.includes(card.id)
            }
            onClick={() => handleCardClick(card.id)}
            disabled={disabledPairs.includes(card.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;
