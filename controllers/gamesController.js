const Game = require("../models/games");

// Returns all games
exports.allGames = async (req, res, next) => {
  try {
    const data = await Game.find().populate("owner", "userName").exec();
    res.json(data);
  } catch (err) {
    res.send(err);
  }
};

// Returns users games list
exports.userGames = async (req, res, next) => {
  const userID = req.params.user;
  // req.user added to request by requireAuth. Contains _id and userName.
  const tokenInfo = req.user;

  if (userID === tokenInfo.userName) {
    try {
      const usersGames = await Game.find({ owner: tokenInfo._id });
      res.status(200).json(usersGames);
    } catch (err) {
      res.status(404).send("No Games Found");
    }
  } else {
    res.status(401).send("You are not authorized to view this info");
  }
};

// Adds game to all game list
exports.addGame = async (req, res, next) => {
  try {
    console.log(req.user);
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
