const Game = require("../models/game");

exports.allGames = async (req, res, next) => {
  try {
    const data = await Game.find().populate("user", "userName").exec();
    res.json(data);
  } catch (err) {
    res.send(err);
  }
};
