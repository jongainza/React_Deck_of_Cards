import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Card from "./Card";

const DeckOfCards = () => {
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(null);
  const [toggle, setToggle] = useState(false);
  const isFirstRender = useRef(true);
  const interval = useRef();

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
    if (!deck) {
      console.error("Deck is null");
      return;
    }
    // console.log(deck.remaining);
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

  useEffect(() => {
    if (!isFirstRender.current) {
      if (toggle) {
        interval.current = setInterval(() => {
          nextCard();
        }, 1000);
        return () => clearInterval(interval.current);
      }
    } else {
      isFirstRender.current = false; // Update the flag after first render
    }
  }, [toggle]);

  async function shuffle() {
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
  }
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <p>Deck ID: {deck ? deck.deck_id : null}</p>
      <button onClick={handleToggle}>{toggle ? "stop" : "start"}</button>
      <button onClick={nextCard}>Draw a Card</button>
      {card && <Card card={card} shuffle={shuffle} />}
    </div>
  );
};

export default DeckOfCards;
