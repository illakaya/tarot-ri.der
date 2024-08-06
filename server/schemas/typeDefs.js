// Need to add a schema for Apollo to communicate with GraphQL
// Define the types User, Draw and Card
const typeDefs = `
  type Card {
    name: String!
    
  }

  type Draw {
    _id: ID
    date: String
    question: String
    cardsDrawn: [Card]
  }

  type User {
    _id: ID
    prefName: String!
    email: String!
    draws: [Draw]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
    draw(_id: ID!): Draw 
    cards: [Card]
    card(name: String!): Card
  }

  type Mutation {
    addUser(prefName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addDraw(drawData: DrawInput!): User
    deleteDraw(_id: ID!): User
  }

  input DrawInput {
    date: String
    
    question: String
    cardsDrawn: [String]
  }
`

module.exports = typeDefs;