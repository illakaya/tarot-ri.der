// Import the models and authorisation
const { User, Card, Draw } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    // get the user by their id context
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    draw: async (parent, { _id }) => {
      return await Draw.findById(_id);
    },
    allCards: async () => {
      return await Card.find();
    },
    card: async (parent, { val }) => {
      return await Card.findOne({ val: val });
    },
    // arrayOfCards: async(parent, { cardVal }) => {
    //   return Card.find({ val: { $in: cardVal } })
    // }
  },

  Mutation: {
    addUser: async (parent, { prefName, email, password }) => {
      const user = await User.create({ prefName, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        // do not define the error in order to make it a little bit more secure
        throw new AuthenticationError();
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        // do not define the error in order to make it a little bit more secure
        throw new AuthenticationError();
      }
      const token = signToken(user);
      return { token, user };
    },
    saveDraw: async (parent, { question, cardsDrawn }, context) => {
      if (context.user) {
        const newDraw = new Draw({question, cardsDrawn});
        return User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { draws: newDraw } },
          // this will return the new object instead of the old in GraphQL
          { new: true, runValidators: true }
        );
      }
      throw AuthenticationError;
    },
    deleteDraw: async (parent, { drawId }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate({ _id: context.user._id }, { $pull: { draws: { drawId } } }, { new: true });
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
