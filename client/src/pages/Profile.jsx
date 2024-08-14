import { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from '@apollo/client';
import { retrieveOneCard } from '../utils/API';
import { QUERY_ME, QUERY_ARRAY_OF_CARDS } from '../utils/queries';
import { Card, Space, Row, Col, Spin } from 'antd';
import Auth from '../utils/auth';

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [getCards, { loading: cardLoading, data: cardsData, error: cardError }] = useLazyQuery(QUERY_ARRAY_OF_CARDS);
  const [cardsMap, setCardsMap] = useState({});
  
  const userData = data?.me || {};

  useEffect(() => {
    if (userData.draws && userData.draws.length > 0) {
      const allCardIds = userData.draws.flatMap(draw => draw.cardsDrawn);
      getCards({ variables: { cardIds: allCardIds.map(id => parseInt(id, 10)) } });
    }
  }, [userData, getCards]);

  useEffect(() => {
    if (cardsData && cardsData.cardsByIds) {
      const newCardsMap = cardsData.cardsByIds.reduce((acc, card) => {
        acc[card.val] = card;
        return acc;
      }, {});
      setCardsMap(newCardsMap);
    }
  }, [cardsData]);

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
        {userData.draws.map(draw => (
          <Card
            key={draw._id}
            title={draw.question ? draw.question : "No query"}
            loading={cardLoading}
          >
            <p>Query was made on {new Date(parseInt(draw.date)).toLocaleString()}</p>
            <Row key={draw._id+100}>
              
                {draw.cardsDrawn.map(cardVal => {
                  const card = cardsMap[cardVal];
                  return card ? (
                    <Col span={8} key={cardVal+5000}>
                    <div key={cardVal}>
                      <img src={`/images/${card.name}.png`} alt={card.name} style={{ width: 100 }} />
                    </div>
                    </Col>
                  ) : (
                    <Col span={8}><p key={cardVal+50000}>Loading card...</p></Col>
                  );
                })}
              
            </Row>
          </Card>
        ))}
      </Space>
    </main>
  );
};

export default Profile;