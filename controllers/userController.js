const User = require("../models/users");

// Sign Up User
exports.signupUser = async (req, res, next) => {
  try {
    req.send("Sign Up User");
  } catch (err) {
    req.send(err);
  }
};

// Login user
exports.loginUser = async (req, res, next) => {
  try {
    req.send("login User");
  } catch (err) {
    req.send(err);
  }
};
