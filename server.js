const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const routerApi = require("./api");

require("dotenv").config();

mongoose.Promise = global.Promise;

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

mongoose
  .connect(uriDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, function () {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(`Database not connection. ${error.message}`);
    process.exit(1);
  });
