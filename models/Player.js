const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
    position: {
      type: String,
      required: true,
    },
    team: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    }
});

module.exports = Player = mongoose.model("player", PlayerSchema);
