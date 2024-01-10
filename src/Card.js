import React from "react";

const Card = ({ card, shuffle }) => {
  return (
    <div>
      <img src={card.image} alt={card.code} />
      <p>
        {card.value} of {card.suit}
      </p>
      <button onClick={shuffle}>Shuffle</button>
    </div>
  );
};

export default Card;
