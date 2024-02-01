const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  hash: { type: String, required: true },
  admin: { type: Boolean, default: false },
});

userSchema.statics.login = async function (email, password) {
  console.log({ email, password });
  if (!email || !password) {
    throw Error("All fields must be filled in.");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.hash);

  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

userSchema.statics.signUp = async function (email, password, userName) {
  if (!email || !userName || !password) {
    throw Error("All fields must be filled in");
  }

  if (!validator.isEmail(email)) {
    throw Error("Please provide a valid email address");
  }

  // if (!validator.isStrongPassword(password)) {
  //   throw Error("Password id not strong enough");
  // }

  const emailExist = await this.findOne({ email });
  const userExist = await this.findOne({ userName });

  if (emailExist || userExist) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, userName, hash });

  return user;
};

module.exports = mongoose.model("User", userSchema);
