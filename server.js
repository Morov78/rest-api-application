const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const routerApi = require("./api");
const { connectionDb } = require("./db");

mongoose.Promise = global.Promise;

require("dotenv").config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(express.json());
app.use(cors());
app.use(morgan(formatsLogger));

app.use("/api", routerApi);

app.use((_, res) => {
  res.status(404).json({
    message: "Use api on routes: /api/contacts",
  });
});

app.use((error, _, res) => {
  console.log(error.stack);
  res.status(500).json({
    message: error.message,
  });
});

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const start = async () => {
  await connectionDb(uriDb);

  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
};

start();
