const express = require("express");
const router = express.Router();

// Get all Games
router.get("/", gameController.allGames);

// Add game to list
router.post("/", gameController.addGame);

// Delete game from List
router.delete("/", gameController.deleteGame);
