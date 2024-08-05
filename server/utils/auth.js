// Import GraphQL class to handle errors
const { GraphQLError } = require("graphql");
// Import jsonwebtoken to handle JWT operations
const jwt = require("jsonwebtoken");
// String sign
const secret = "mysecretssshhhhhhh";
// JWT expires in 2 hours
const expiration = "2h";

// Export the Module object
module.exports = {
  // Use the GraphQLError to signal authentication error
  AuthenticationError: new GraphQLError("Could not aunthenticate the user.", {
    extensions: {
      code: 'UNAUTHENTICATED',
    }
  }),
  // Middleware function for Express.js to check for JWT in incoming requests
  authMiddleware: function ({ req }) {
    // Allow tokens to be sent via, body, query or in the headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    // If the token is in the header, split the header to get the token value ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }
    // If no token is found, return req object
    if (!token) {
      return req;
    }
    // If there is a token, verify the token and if valid, attach decoded token data to the user, otherwise log an error message
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }
    return req;
  },
  // Creates and signs a JWT with the user data, which can be used for authenticating requests
  signToken: function({ prefName, email, _id }) {
    const payload = { prefName, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};