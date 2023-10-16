const mongoose = require("mongoose");
require("dotenv").config();

const Mongo_Url =
  process.env.MONGO_URL || "mongodb://localhost:27017/meanstacktutorials";
const DB_Name = process.env.DB_NAME || "meanstacktutorials";

const connectDatabase = () => {
  try {
    mongoose.connect(Mongo_Url, {
      dbName: DB_Name,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log(`MongoDB connected successfully to ${DB_Name}`);
    });
    connection.on("disconnected", () => {
      console.log(`MongoDB disconnected successfully to ${DB_Name}`);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {connectDatabase};