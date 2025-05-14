import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Game.css";
import confetti from "canvas-confetti";

const Game = ({ words }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [gameWon, setGameWon] = useState(false);

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
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [matchedPairs, cards.length]);

  const handleCardClick = (id) => {
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

  return (
    <div className="game">
      {gameWon && <h2>You Won!</h2>}
      <div className="cards">
        {cards.map((card) => (
          <Card
            key={card.id}
            word={card.word}
            isFlipped={
              flippedCards.includes(card.id) || matchedPairs.includes(card.id)
            }
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;
