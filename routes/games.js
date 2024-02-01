const express = require("express");
const router = express.Router();

const gameController = require("../controllers/gamesController");
const requireAuth = require("../middleware/requireAuth");

// Get all Games
router.get("/", gameController.allGames);

// Get users games
router.get("/:user", requireAuth, gameController.userGames);

// Add game to list
router.post("/", gameController.addGame);

// Delete game from List
router.delete("/", gameController.deleteGame);

module.exports = router;
