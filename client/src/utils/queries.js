// Create the graphql queries
import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      draws {
        date
        question
        cardsDrawn {
          name
          val
        }
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