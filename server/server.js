// Import Express server to create Node.js application
const express = require("express");
// Import Apollo server to handle GraphQL requests
const { ApolloServer } = require("@apollo/server");
// Import express middleware to integrate Apollo Server with Express
const { expressMiddleware } = require("@apollo/server/express4");
// Import path to handle files and directory paths
const path = require("path");
// Import custom Authentication middleware
const { authMiddleware } = require("./utils/auth");
// Import GraphQL schema definitions and resolver functions
const { typeDefs, resolvers } = require("./schemas");
// Connect to MongoDB and Mongoose ODM (located in config folder)
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
  // Start Apollo Server
  await server.start();
  // Middleware to parse URL-encoded and JSON data
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  // Serve up static assets
  app.use("/images", express.static(path.join(__dirname, "../client/images")));
  // Apply Apollo middleware for GraphQL with authentication contect
  app.use("/graphql", expressMiddleware(server, {
    context: authMiddleware
  }));
  // Server static files and routing in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }
  // Listen for the database connection to open, then start the Express server
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
}

// Call the async function to start the server
startApolloServer();