const User = require("../models/users");

// Sign Up User
exports.signupUser = async (req, res, next) => {
  try {
    res.send("Sign Up User");
  } catch (err) {
    res.send(err);
  }
};

// Login user
exports.loginUser = async (req, res, next) => {
  try {
    res.send("Login User");
  } catch (err) {
    res.send(err);
  }
};
