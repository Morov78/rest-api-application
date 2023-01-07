const mongoose = require("mongoose");

const connectionDb = async (uriDb) => {
  await mongoose
    .connect(uriDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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
