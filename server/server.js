// Import Express server to create Node.js application
const express = require("express");
// Import Apollo server to communicate with Mongoose
const { ApolloServer } = require("@apollo/server");
// Import express middleware
const { expressMiddleware } = require("@apollo/server/express4");
// Import path (files and directories)
const path = require("path");
// Import Authentication script
const { authMiddleware } = require("./utils/auth");
// Import the typeDefs and resolvers that define the models and process the data in GraphQL
const { typeDefs, resolvers } = require("./schemas");
// Connect to MongoDB and Mongoose ODM
const db = require("./config/connection");
// Set up the port
const PORT = process.env.PORT || 3001;
// Initialise the Express application
const app = express();
// Initialise the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo Server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve up static assets
  app.use("/images", express.static(path.join(__dirname, "../client/images")));

  app.use("/graphql", expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
}

// Call the async function to start the server
startApolloServer();