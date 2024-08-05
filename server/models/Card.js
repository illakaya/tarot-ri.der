// Import mongoose
const mongoose = require("mongoose");
// Retrieve Schema from mongoose
const { Schema } = mongoose;

// Define structure of the Draw document
const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  /*
  reversed: {
    type: Boolean,
    required: true,
    default: false,
  },
  */
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;