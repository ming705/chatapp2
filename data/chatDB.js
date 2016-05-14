var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
var mongoose = require("mongoose");

var url = "mongodb://localhost:27017/chat";
var connect = MongoClient.connect(url);

mongoose.Promise = global.Promise;
mongoose.connect(url);

var User = require("../admin/userModel");
var Room = require("../admin/roomModel");
var Message = require("./messageModel");

module.exports = {
  connect,
  User,
  Room,
  Message,
  close: function () {
    connect.then(db => db.close());
    mongoose.disconnect();
  }
};
