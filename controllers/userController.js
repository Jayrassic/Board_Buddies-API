const User = require("../models/users");
const jwt = require("jsonwebtoken");

const createToken = (_id, userName) => {
  return jwt.sign({ _id, userName }, process.env.TOKEN_KEY, {
    expiresIn: "2d",
  });
};

// Sign Up User
exports.signupUser = async (req, res, next) => {
  const { email, password, userName } = req.body;

  try {
    const user = await User.signUp(email, password, userName);

    const token = createToken(user._id, user.userName);

    res.status(200).json({ email, token, userName });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login user
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const userName = user.userName;

    // create token
    const token = createToken(user._id, user.userName);

    res.status(200).json({ email, token, userName });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
