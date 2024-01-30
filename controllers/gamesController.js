const Game = require("../models/game");

// eturns all games
exports.allGames = async (req, res, next) => {
  try {
    const data = await Game.find().populate("user", "userName").exec();
    res.json(data);
  } catch (err) {
    res.send(err);
  }
};

// Adds game to all game list
exports.addGame = async (req, res, next) => {
  try {
    res.send("Game Added");
  } catch (err) {
    res.send(err);
  }
};

// Deletes game from all game list
exports.deleteGame = async (req, res, next) => {
  try {
    res.send("Delete Game");
  } catch (err) {
    res.send(err);
  }
};
