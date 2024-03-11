const express = require("express");
const router = express.Router();
const { param } = require("express-validator");

const gameController = require("../controllers/gamesController");
const requireAuth = require("../middleware/requireAuth");

// Get all Games
router.get("/", gameController.allGames);

// Get users games
router.get(
  "/:user",
  param("user").trim().escape(),
  requireAuth,
  gameController.userGames
);

// Add game to list
router.post("/", requireAuth, gameController.addGame);

// Delete game from List
router.delete("/", requireAuth, gameController.deleteGame);

module.exports = router;
