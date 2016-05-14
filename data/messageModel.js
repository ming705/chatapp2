var mongoose = require("mongoose");

var schemaOptions = {
  collection: "messages"
};

var schema = new mongoose.Schema({
  text: {type: String, required: true},
  room: {type: String, required: true},
  user: {type: String, required: true}
}, schemaOptions);

module.exports = mongoose.model("message", schema);
