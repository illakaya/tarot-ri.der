import { useQuery } from '@apollo/client';
import { ALL_CARDS } from '../utils/queries';
import { Col, Row } from 'antd';

const Card = () => {
  const { loading, data } = useQuery(ALL_CARDS);
  const cardData = data?.allCards || {};
  if (loading) return <main><h1>Loading...</h1></main>
  return (
    <main className="container">
      <h1>All Cards</h1>
      <Row>
        {cardData.map((card => {
          return (
            <Col>
              <a href="/">
              <img className="chosen-card" src={`/images/${card.name}.png`} alt={card.name} />
              </a>
            </Col>
          )
        }))}
      </Row>
    </main>
  );
};

export default Card;
