import { useState, useEffect } from "react";
import { useLazyQuery, useMutation } from '@apollo/client';
import { Form, Input, Button, Col, Row } from 'antd';
import { QUERY_CARD } from '../utils/queries';
import { SAVE_DRAW } from '../utils/mutations';
import { retrieveOneCard } from '../utils/API';
import Auth from '../utils/auth'; 
// To save data to the user
// import { saveSelectedCardInfo } from '../utils/localStorage';

const DrawCards = () => {
  // Shuffle function to randomize array order
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const [form] = Form.useForm();
  const [questionInput, setQuestionInput] = useState('');
  const [drawStart, setDrawStart] = useState(false); // State to manage form input disable
  const [fullDraw, setFullDraw] = useState(false);
  const [revMean, setRevMean] = useState(true);
  const [cards, setCards] = useState(shuffleArray(Array.from({ length: 78 }, (_, i) => ({ id: i + 1 }))));
  const [selectedCards, setSelectedCards] = useState([]);
  const [cardData, setCardData] = useState({});
  const [meaningCards, setMeaningCards] = useState([]);
  const [saveDraw] = useMutation(SAVE_DRAW);
  // Using Array method in JS to create a new array of length 78 of undefined elements
  // map into the array, assigning it a value from 1 to 78 inclusive
  // since the elements are undefined, use _ to represent the element, then using its index, map the index + 1

  const [loadCard, { loading: queryLoading, data: queryData, error: queryError }] = useLazyQuery(QUERY_CARD);

  useEffect(() => {
    if (selectedCards.length > 0) {
      const cardId = parseInt(selectedCards[selectedCards.length - 1], 10);
      console.log('Loading card with ID:', cardId);
      loadCard({ variables: { val: cardId } });
    }
  }, [selectedCards, loadCard]);

  useEffect(() => {
    console.log('Card Data:', cardData);
    console.log('Selected Cards:', selectedCards);
    if(selectedCards.length === 3) handleSaveDraw();
  }, [cardData]);

  useEffect(() => {
    if (queryData && queryData.card) {
      const card = queryData.card;
      if (card && card.val) {
        setCardData(prev => ({
          ...prev,
          [card.val]: card
        }));
      } else {
        console.error('Card data is missing a val field:', card);
      }
    }
  }, [queryData]);

  const shuffleCards = () => setCards(shuffleArray([...cards]));

  const handleSaveDraw = async () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(`question: ${questionInput}`);
    console.log(`cards: ${typeof selectedCards[0]}`);
    console.log(`cards: ${cardData[selectedCards[0]]._id}`);
    if (!token) return false;
    try {
      await saveDraw({ variables: {question: questionInput, cardsDrawn: selectedCards.map((caaards) => cardData[caaards]._id)}});
    } catch (err) {
      console.error(err);
    }
  };

  const selectCard = async (event, index) => {
    if (selectedCards.length >= 3) return;
    
    const cardId = event.currentTarget.getAttribute('data-id').toString();
    const newSelectedCards = [...selectedCards, cardId];
    
    // update selected cards & Save the updated selected card IDs to local storage
    setSelectedCards(newSelectedCards);
    
    // Hide the card
    const updatedCards = cards.map((card, i) =>
      i === index ? { ...card, hidden: true } : card
    );
    setCards(updatedCards);
    // After selecting the 3rd card, disable the deck
    if (selectedCards.length === 2) {
      setFullDraw(true);
      setRevMean(false);
    }
    // Disable the form input after the first card is selected
    if (selectedCards.length === 0) setDrawStart(true);
  };

  const revealMeaning = async (event) => {
    const meanings = [];
    for (let i = 0; i < 3; i++) {
      try {
        const response = await retrieveOneCard(cardData[selectedCards[i]].name);
        if (!response.ok) {
          throw new Error('something went wrong!');
        }
        const { card } = await response.json();
        console.log(card);
        meanings.push(card);
      } catch (err) {
        console.error(err);
      }
    }
    // saveSelectedCardInfo(meaningCards);
    // Update the state with the fetched card meanings
    setMeaningCards(meanings);  
    setRevMean(true);
  };

  // Handle loading and error states
  // if (queryLoading) return <p>Loading...</p>; this makes it look like the whole page is reloading so remove
  if (queryError) return <h1>Error: {queryError.message}</h1>;

  const styles = {
    disabled: { pointerEvents: "none", opacity: 0.5 },
    fullWidth: { width: "100%" },
    input: { maxWidth: "650px", textAlign: "center" }
  };

  return (
    <main>
      <h1>Tarot Reading</h1>
      <p>Awaken your inner thoughts and seek another perspective to gain clarity with a 3-card Tarot spread.</p>
      <i>Once you have chosen a card, your query and deck is locked in.</i>
      <br />
      <Form
        name="query"
        layout="vertical"
        style={styles.fullWidth}
        disabled={drawStart}
        onFinish={(values) => console.log(values)}
      >
        <Form.Item name="queryQuestion" >
          <Input 
            placeholder="Enter your query here (optional)" 
            style={styles.input}
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
          />
        </Form.Item>
      </Form>
      <Button 
        style={drawStart ? styles.disabled : {}}
        onClick={shuffleCards}
      >
        Shuffle
      </Button>
      <div 
        className="tarot-deck"
        style={fullDraw ? styles.disabled : {}}
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
      <p><strong>​Opportunities</strong>: How to turn your challenges and obstacles into opportunities</p>
      <Row style={styles.fullWidth}>
        <Col span={8}>
          <h2>Self</h2>
          {selectedCards[0] && cardData[selectedCards[0]] && (
            <img className="chosen-card" src={`/images/${cardData[selectedCards[0]].name}.png`} alt="tarot card" />
          )}
          {meaningCards.length > 0 && (
            <div>
              <h3>{meaningCards[0].name}</h3>
              <p>{meaningCards[0].meaning_up}</p>
            </div>
          )}
        </Col>
        <Col span={8}>
          <h2>Situation</h2>
          {selectedCards[1] && cardData[selectedCards[1]] && (
            <img className="chosen-card" src={`/images/${cardData[selectedCards[1]].name}.png`} alt="tarot card" />
          )}
          {meaningCards.length > 0 && (
            <div>
              <h3>{meaningCards[1].name}</h3>
              <p>{meaningCards[1].meaning_up}</p>
            </div>
          )}
        </Col>
        <Col span={8}>
          <h2>Opportunities</h2>
          {selectedCards[2] && cardData[selectedCards[2]] && (
            <img className="chosen-card" src={`/images/${cardData[selectedCards[2]].name}.png`} alt="tarot card" />
          )}
          {meaningCards.length > 0 && (
            <div>
              <h3>{meaningCards[2].name}</h3>
              <p>{meaningCards[2].meaning_up}</p>
            </div>
          )}
        </Col>
      </Row>
      <Button 
        style={revMean ? {display: "none"} : {}}
        onClick={revealMeaning}
      >
        Reveal Meaning
      </Button>
    </main>
  );
};

export default DrawCards;
