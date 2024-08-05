// Retrieve Schema from mongoose
const { Schema } = require("mongoose");

// This is a subdocument schema, it will not becomes its own model, but it is being used the card scehma for the cardsDrawn array in Draw.js
const cardSchema = new Schema({
  card: {
    type: String,
    required: true,
  },
  reversed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = cardSchema;