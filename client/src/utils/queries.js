// Create the graphql queries
import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      prefName
      email
      draws {
        date
        question
        cardsDrawn
      }
    }
  }
`;

export const QUERY_CARD = gql`
  query Card($val: Int!) {
    card (val: $val) {
      name
      val
    }
  }
`;

export const QUERY_ARRAY_OF_CARDS = gql`
  query ArrayOfCards($cardVals: [Int]) {
    arrayOfCards(cardVals: [$cardVals]) {
      name
      val
    }
  }
`