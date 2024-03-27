const Mongoose = require('mongoose');
Mongoose.Promise = global.Promise;
const db = {};
db.Mongoose = Mongoose;

db.User = require("./user.model");


module.exports = db
