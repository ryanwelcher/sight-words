import React, { useEffect } from "react";
import "./Card.css";

const Card = ({ word, isFlipped, onClick, disabled }) => {
  useEffect(() => {
    if (isFlipped) {
      const speech = new SpeechSynthesisUtterance(word);
      window.speechSynthesis.speak(speech);
    }
  }, [isFlipped, word]);

  const image =
    "https://resizing.flixster.com/eGfSs7-RN8wAxu2DQqcqmCR-rbk=/150x200/v2/https://resizing.flixster.com/ViCYuISBvkrLsqD3ePYNSHszhoc=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzc1ZTAwYzViLTIyMzAtNDJmMS04NjNlLTBjMTAyMjkyZDhhYy5qcGc=";

  const creeper =
    "https://m.media-amazon.com/images/I/31olIWRlnCL._AC_SY1000_.jpg";

  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""} ${
        disabled ? "disabled" : ""
      }`}
      onClick={disabled ? undefined : onClick}
    >
      <div className="card-inner">
        <div className="card-front">
          <img src={creeper} alt="Card Back" width="120" />
        </div>
        <div className="card-back">{word}</div>
      </div>
    </div>
  );
};

export default Card;
