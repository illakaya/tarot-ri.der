import { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from '@apollo/client';
import { retrieveOneCard } from '../utils/API';
import { QUERY_ME, /*QUERY_ARRAY_OF_CARDS*/ } from '../utils/queries';
import { Card, Space, Row, Col, Spin, Button } from 'antd';
import Auth from '../utils/auth';

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [meaningCards, setMeaningCards] = useState([]);
  const [revMean, setRevMean] = useState(false);
  
  const userData = data?.me || {};

  const revealMeaning = async (event) => {
    // const meanings = [];
    // for (let i = 0; i < 3; i++) {
    //   try {
        // this needs to be adjusted
        // const response = await retrieveOneCard(cardData[selectedCards[i]].name);
    //     if (!response.ok) {
    //       throw new Error('something went wrong!');
    //     }
    //     const { card } = await response.json();
    //     console.log(card);
    //     meanings.push(card);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }
    // saveSelectedCardInfo(meaningCards);
    // Update the state with the fetched card meanings
    // setMeaningCards(meanings);  
    setRevMean(true);
  };

  if (!Auth.loggedIn()) {
    return (
      <main>
        <h1>Oops!</h1>
        <h3>
          You need to be logged in to see this. Use the navigation links above to
          sign up or log in!
        </h3>
      </main>
    );
  }
  if (loading) return <main><h1>Loading...</h1></main>

  return (
    <main className="container">
      <h1>Hi {userData.prefName}!</h1>
      <h2>You have made {userData.draws.length} draws</h2>
      <Space direction="vertical" size="large" style={{width: "100%"}}>
        {userData.draws.map((draw, index) => (
          <Card
            size="small"
            key={draw.id}
            title={`Draw ${index+1}`}
          >
            <h2>Query: {draw.question ? draw.question : "No query"}</h2>
            <Row>
              {draw.cardsDrawn.map((card, index) => (
                <Col span={8}>
                  <h3>{index === 0 ? "Self" : (index === 1 ? "Situation" : "Opportunities")}</h3>
                  <img className="chosen-card" src={`/images/${card.name}.png`} alt="tarot card" />
                </Col>
              ))}
            </Row>
            <Button 
              key={draw.id} 
              onClick={revealMeaning}
            >
              {revMean ? "Reveal Meaning" : "Hide Meaning"}
            </Button>
          </Card>
        ))}
        
      </Space>
    </main>
  );
};

export default Profile;