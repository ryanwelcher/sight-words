import React from "react";
import "./Card.css";

const Card = ({ word, isFlipped, onClick }) => {
  return (
    <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front">
          <img
            src="https://placehold.co/150x200/orange/white"
            alt="Card Back"
          />
        </div>
        <div className="card-back">{word}</div>
      </div>
    </div>
  );
};

export default Card;
