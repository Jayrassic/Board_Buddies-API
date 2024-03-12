const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, require: true },
  description: { type: String, require: true },
  minPlayers: { type: Number, require: true },
  maxPlayers: { type: Number, require: true },
  playingTime: { type: Number, require: true },
  image: { type: String, require: true },
  thumbnail: { type: String, require: true },
  dateAdded: { type: Date, require: true },
});

module.exports = mongoose.model("Game", gameSchema);
