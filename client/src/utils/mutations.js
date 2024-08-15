// Create the graphql mutations
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        prefName
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($prefName: String!, $email: String!, $password: String!) {
    addUser(prefName: $prefName, email: $email, password: $password) {
      token
      user {
        _id
        prefName
        email
      }
    }
  }
`;

export const SAVE_DRAW = gql`
  mutation saveDraw($question: String, $cardsDrawn: [ID]) {
    saveDraw(question: $question, cardsDrawn: $cardsDrawn) {
      _id
      prefName
      email
      draws {
        date
        question
        cardsDrawn {
          name
        }
      }
    }
  }
`;