/* To remove user, add users _id to the removeUserAndGames function within the main function  */

const Game = require("./models/games");
const User = require("./models/users");
require("dotenv").config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));

// Function fro removing user and all their associated games.
async function main() {
  console.log("Preparing to remove user and games");
  await mongoose.connect(process.env.DB_KEY);
  console.log("Connected to database");
  // Input _id below in string form
  await removeUserAndGames("66041b910b134fc82eb30c93");
  console.log("Closing connection");
  await mongoose.connection.close();
  console.log("Connection closed");
}

async function removeUserAndGames(userId) {
  console.log(`Deleting User Id ${userId}`);
  try {
    await Game.deleteMany({ owner: { _id: userId } });
    await User.findByIdAndDelete(userId);
    console.log(`User and Games deleted`);
  } catch (err) {
    console.log(err);
  }
}
