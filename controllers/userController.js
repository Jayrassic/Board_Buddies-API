const User = require("../models/users");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const createToken = (_id, userName) => {
  return jwt.sign({ _id, userName }, process.env.TOKEN_KEY, {
    expiresIn: "2d",
  });
};

// Sign Up User
exports.signupUser = [
  body("userName")
    .trim()
    .isLength({ min: 2, max: 15 })
    .escape()
    .withMessage("User Name must be between 2 and 10 characters long."),
  body("password")
    .trim()
    .escape()
    .isStrongPassword({
      minLength: 8,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must include one uppercase, one number, and one symbol."
    ),
  body("email")
    .trim()
    .escape()
    .isEmail()
    .withMessage("Please enter a valid email address."),

  async (req, res, next) => {
    const errors = validationResult(req);

    const { email, password, userName } = req.body;

    if (!errors.isEmpty()) {
      const cleanErrors = errors.errors.map((error) => error.msg);
      console.log(cleanErrors);
      res.status(400).json({ error: cleanErrors });
    } else {
      try {
        const user = await User.signUp(email, password, userName);

        const token = createToken(user._id, user.userName);

        res.status(200).json({ email, token, userName });
      } catch (err) {
        res.status(400).json({ error: [err.message] });
      }
    }
  },
];

// Login user
exports.loginUser = [
  body("password").trim().escape(),
  body("email")
    .trim()
    .escape()
    .isEmail()
    .withMessage("Please enter a valid email address."),

  async (req, res, next) => {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const cleanErrors = errors.errors.map((error) => error.msg);
      console.log(cleanErrors);
      res.status(400).json({ error: cleanErrors });
    } else {
      try {
        const user = await User.login(email, password);
        const userName = user.userName;

        // create token
        const token = createToken(user._id, user.userName);

        res.status(200).json({ email, token, userName });
      } catch (err) {
        res.status(400).json({ error: [err.message] });
      }
    }
  },
];
