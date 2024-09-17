import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "/config/db.js" });

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectDB;

// const mongoose = require("mongoose");
// require("dotenv").config();

// const mongoURL = process.env.MONGODB_URL;

// mongoose.connect(mongoURL);
// const db = mongoose.connection;

// db.on("connected", () => {
//   console.log("Database connecetd successfuly");
// });
// db.on("disconnected", () => {
//   "Database Disconnected";
// });
// db.on("Error", () => {
//   "Database Internal server Error ";
// });

// module.exports = db;
