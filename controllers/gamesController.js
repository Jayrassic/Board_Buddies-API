const Game = require("../models/games");
const User = require("../models/users");

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
      if (usersGames.length === 0) {
        throw new Error("No Games");
      }
      res.status(200).json(usersGames);
    } catch (err) {
      res.status(404).send({ message: "No Games Found" });
    }
  } else {
    res
      .status(401)
      .send({ message: "You are not authorized to view this info" });
  }
};

// Adds game to all game list
exports.addGame = async (req, res, next) => {
  const userInfo = req.user;
  const gameData = req.body;

  if (!gameData) {
    res.send("No Game Data");
  }

  const match = await Game.findOne({
    owner: userInfo._id,
    name: gameData.name,
  });

  if (!match) {
    try {
      const newGame = await Game.create({ owner: userInfo._id, ...gameData });
      res.status(200).json(newGame);
    } catch (err) {
      console.log(err);
      res.status(400).json({ Error: err });
    }
  } else {
    res.status(400).json({ error: "Game already in library" });
  }
};

// Deletes game from all game list
exports.deleteGame = async (req, res, next) => {
  const userInfo = req.user;
  const gameData = req.body;

  console.log(gameData);

  if (!gameData) {
    res.send("No Game Data");
  }

  const deletedGame = await Game.findOneAndDelete({
    owner: userInfo._id,
    name: gameData.name,
  });

  if (!deletedGame) {
    return res.status(400).json({ Error: "Game is not in library" });
  }

  res.status(200).json(deletedGame);
};
