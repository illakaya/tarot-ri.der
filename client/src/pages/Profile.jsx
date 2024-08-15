import { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from '@apollo/client';
import { retrieveOneCard } from '../utils/API';
import { QUERY_ME, /*QUERY_ARRAY_OF_CARDS*/ } from '../utils/queries';
import { Card, Space, Row, Col, Spin } from 'antd';
import Auth from '../utils/auth';

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  
  const userData = data?.me || {};


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
            size="small"
            key={draw._id}
            title={draw.question ? draw.question : "No query"}
          >
            <p>{new Date(parseInt(draw.date)).toLocaleString()}</p>
            <Row>
              {draw.cardsDrawn.map(card => (
                <Col span={8}>
                  {/* <p>{card.name}</p> */}
                  <img className="chosen-card" src={`/images/${card.name}.png`} alt="tarot card" />
                </Col>
              ))}
            </Row>
          </Card>
        ))}
      </Space>
    </main>
  );
};

export default Profile;