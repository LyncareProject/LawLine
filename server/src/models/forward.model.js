const mongoose = require("mongoose");

const Role = mongoose.model(
  "Forward",
  new mongoose.Schema({
    path: String,
    count: { type: Number, default: 0 },
  })
);

module.exports = Role;
