const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  preferences: {
    type: [],
    required: false,
  },
});

module.exports = mongoose.model("User", Schema);
