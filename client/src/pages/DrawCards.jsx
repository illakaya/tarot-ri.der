import { useState, useEffect } from "react";
import { Form, Input, Button } from 'antd';

// To save data to the user
import Auth from '../utils/auth';

import { saveCardIds, getSavedCardIds, saveSelectedCardIds } from '../utils/localStorage';

const DrawCards = () => {

  const styles = {
    form: {
      width: "100%",
    },
    input: {
      maxWidth: "650px",
      textAlign: "center",
    },
    buttonDisabled: {
      width: "fit-content",
      pointerEvents: "none", // Prevent clicks and interactions
      opacity: 0.5, // visually indicate that it's disabled
    },
    tarotDeckDisabled: {
      pointerEvents: "none", // Prevent clicks and interactions
      opacity: 0.5, // visually indicate that it's disabled
    }
  }

  const [form] = Form.useForm();
  const [isFormDisabled, setIsFormDisabled] = useState(false); // State to manage form input disable
  const [isDeckDisabled, setIsDeckDisabled] = useState(false);

  const saveQuery = (query) => {
    console.log(`Success: ${query}`);
  };
  const errorQuery = (error) => {
    console.log(`Error: ${error}`);
  };

  // Shuffle function to randomize array order
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Using Array method in JS to create a new array of length 78 of undefined elements
  // map into the array, assigning it a value from 1 to 78 inclusive
  // since the elements are undefined, use _ to represent the element, then using its index, map the index + 1
  const initialCards = shuffleArray(Array.from({ length: 78 }, (_, i) => ({ id: i })));
  const [cards, setCards] = useState(initialCards);
  const [selectedCards, setSelectedCards] = useState([]);
  // create state to hold saved cardId values
  const [savedCardIds, setSavedCardIds] = useState(getSavedCardIds());
  // ADD MUTATION HERE
  useEffect(() => {
    saveCardIds(savedCardIds);
  }, [savedCardIds]);
  const shuffleCards = () => {
    setCards(prevCards => {
      const shuffled = [...prevCards].sort(() => Math.random() - 0.5);
      return shuffled;
    });
  };

  const selectCard = async (event, index) => {
    if (selectedCards.length >= 3) return;

    const cardId = event.currentTarget.getAttribute('data-id');
    // update selected cards
    setSelectedCards(prevSelectedCards => {
      const updatedSelectedCards = [...prevSelectedCards, cardId];
      // Save the updated selected card IDs to local storage
      saveSelectedCardIds(updatedSelectedCards);
      return updatedSelectedCards;
    });
    
    // Hide the card
    const updatedCards = cards.map((card, i) =>
      i === index ? { ...card, hidden: true } : card
    );
    setCards(updatedCards);

    // Disable the form input after the first card is selected
    if (selectedCards.length === 0) {
      setIsFormDisabled(true);
    }
    if (selectedCards.length === 2) { // After selecting the 3rd card, disable the deck
      setIsDeckDisabled(true);
    }
  };

  return (
    <main className="container">
      <h1>Tarot Reading</h1>
      <p>Awaken your inner thoughts and seek another perspective to gain clarity with a 3-card Tarot spread.</p>
      <i>Once you have chosen a card, your query and deck is locked in.</i>
      <br />
      <Form
        name="query"
        onFinish={saveQuery}
        onFinishFailed={errorQuery}
        layout="vertical"
        style={styles.form}
        disabled={isFormDisabled}
      >
        <Form.Item
          name="queryQuestion"
        >
          <Input 
            placeholder="Enter your query here (optional)"
            style={styles.input}
          />
        </Form.Item>
      </Form>
      <Button 
        style={isFormDisabled ? styles.buttonDisabled : {}}
        onClick={shuffleCards}
      >
        Shuffle
      </Button>
      <div 
        className="tarot-deck"
        style={isDeckDisabled ? styles.tarotDeckDisabled : {}}
      >
      
      {cards.map((card, index) => (
          !card.hidden && (
            <div
              key={card.id}
              data-id={card.id}
              className="tarot-card"
              onClick={(event) => selectCard(event, index)}
              style={{ left: `${index/78*80}vw` }}
            >
              <img src="/images/tarot-back02.png" alt="tarot card" />
            </div>
          )
        ))}
    </div>
    <h2>Tarot Card Positions</h2>
    <p><strong>Self</strong>: How you perceive yourself right now</p>
    <p><strong>Situation</strong>: Social or circumstantial factors that could be affecting your life now</p>
    <p><strong>Challenges/​Opportunities</strong>: How to turn your obstacles into opportunities</p>

    </main>
  );
};

export default DrawCards;
