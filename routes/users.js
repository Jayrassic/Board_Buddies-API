const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// Sign Up User
router.post("/signup", userController.signupUser);

// login User
router.post("/login", userController.loginUser);

module.exports = router;
