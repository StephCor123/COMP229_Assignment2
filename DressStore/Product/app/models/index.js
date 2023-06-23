const dbConfig = require("../config/db.config");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {
  mongoose: mongoose,
  url: dbConfig.url,
  Category: require("./category.models.js")(mongoose),
  Product: require("./product.models.js")(mongoose)
};

module.exports = db;