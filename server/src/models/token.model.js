const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  id: { type: String, required: true },
  token: { type: String, required: true },
});

const Token = mongoose.model("token", tokenSchema);

module.exports = Token;
