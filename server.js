const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const contactRouter = require("./api/contactRouter");
const userRouter = require("./api/userRouter");

const { connectionDb } = require("./db");

mongoose.Promise = global.Promise;

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(express.json());
app.use(cors());
app.use(morgan(formatsLogger));
app.use(express.static("public"));

app.use("/api/users", userRouter);
app.use("/api/contacts", contactRouter);
app.use((_, res) => {
  res.status(404).json({
    message: "Use api on routes: /api/users/, /api/contacts/",
  });
});

app.use((error, _, res) => {
  console.log(error.stack);
  res.status(500).json({
    message: error.message,
  });
});

const PORT = process.env.NODE_DOCKER_PORT || 3000;

const start = async () => {
  await connectionDb();

  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
};

start();

module.exports = { start };
