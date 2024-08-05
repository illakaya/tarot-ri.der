// Import mongoose
const mongoose = require("mongoose");
// Retrieve Schema from mongoose
const { Schema } = mongoose;
// Import bcrypt to hash passwords
const bcrypt = require("bcrypt");
// Need Draw model
const Draw = require("./Draw");

// Define structure of the User document
const userSchema = new Schema({
  prefName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  draws: [Draw.schema]
});

// Set up pre-save middleware to create password, runs before a user document is saved to the database
// Salt rounds refer to the level of security of the hashing
userSchema.pre("save", async function(next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Create a Mongoose model
const User = mongoose.model("User", userSchema);

// Export to be used in other areas of the application
module.exports = User;