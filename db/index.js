const mongoose = require("mongoose");

const {uriDb} = require("./db.config")

mongoose.set('strictQuery',false)

const connectionDb = async () => {
  await mongoose
    .connect(uriDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "db-contacts"
    })
    .then(() => {
      console.log("Database connection successful");
    })
    .catch((error) => {
      console.log(`Database not connection. ${error.message}`);
      process.exit(1);
    });
};

const disconnectDb = async () => {
  await mongoose.disconnect();
};

module.exports = { connectionDb, disconnectDb };
