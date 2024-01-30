const express = require("express");
const router = express.Router();

const gameController = require("../controllers/gamesController");

// Get all Games
router.get("/", gameController.allGames);

// Add game to list
router.post("/", gameController.addGame);

// Delete game from List
router.delete("/", gameController.deleteGame);

module.exports = router;
