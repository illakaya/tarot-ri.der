// Import mongoose
const mongoose = require("mongoose");
// Retrieve Schema from mongoose
const { Schema } = mongoose;
// import schema from Card.js
const Card = require('./Card');

// Define structure of the Draw document
const drawSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  /*
  drawType: {
    type: Number,
    required: true,
  },
  */
  question: {
    type: String,
    trim: true,    
  },
  cardsDrawn: [Card.schema],
});

const Draw = mongoose.model("Draw", drawSchema);

module.exports = Draw;