const Mongoose = require("mongoose");
const schema = Mongoose.Schema;
const model = Mongoose.model;
const ObjectId = Mongoose.Schema.Types.ObjectId;
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "../.env") });
// const {
//   APP_BASE_URL = "http://localhost:3000/",
//   SITENAME = "demo-task",
//   MONGODB_DB_STRING = "mongodb+srv://Dairdrop:fLTcSUpJc8lPhIPW@cluster0.wduu5hh.mongodb.net/Dairdrop?retryWrites=true&w=majority",
//   COOKIE_KEY = "dairdrop",
// } = process.env;
module.exports = {
  schema,
  ObjectId,
  model,
  config: {
    baseUrl: process.env.APP_BASE_URL,
    siteName: process.env.SITENAME,
  },
  mongodb: {
    DB_HOST_URL: process.env.MONGODB_DB_STRING,
  },
  session: {
    cookieKey: process.env.COOKIE_KEY,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
    ACCESS_EXPIRATION_MINUTES: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    REFRESH_EXPIRATION_DAYS: process.env.JWT_REFRESH_EXPIRATION_DAYS
},
};
