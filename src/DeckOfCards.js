import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const DeckOfCards = () => {
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(null);

  useEffect(() => {
    async function getDeck() {
      try {
        const res = await axios.get(
          "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        );
        setDeck(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    }
    getDeck();
  }, []);

  const nextCard = async () => {
    console.log(deck.remaining);
    console.log(deck.deck_id);
    if (deck && deck.remaining < 1) {
      alert("Error, no cards remaining on the deck");
    } else if (deck && deck.deck_id) {
      try {
        const res = await axios.get(
          `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
        );
        setDeck(res.data);
        setCard(res.data.cards[0]);
        console.log(res.data.cards[0]);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching card:", error);
      }
    }
  };

  const shuffle = async () => {
    if (deck && deck.deck_id) {
      try {
        const res = await axios.get(
          `https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`
        );
        setCard(null);
        setDeck(res.data);
      } catch (error) {
        console.error("Error shuffling deck", error);
      }
    }
  };

  return (
    <div>
      <p>Deck ID: {deck ? deck.deck_id : null}</p>
      <button onClick={nextCard}>Draw a Card</button>
      {card && <Card card={card} shuffle={shuffle} />}
    </div>
  );
};

export default DeckOfCards;
