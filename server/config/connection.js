// Import Mongoose
const mongoose = require("mongoose");
// Connect with either the online MongoDB or the local MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tarot-cards");
// Export to be used in server.js
module.exports = mongoose.connection;
