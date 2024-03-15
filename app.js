const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const gamesRouter = require("./routes/games");

const app = express();

const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_KEY);
  console.log("Connected to database");
}
// !!!!!!!!!!!!!!!!! Add production server
var whitelist = ["http://localhost:5173"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/games", gamesRouter);

module.exports = app;
