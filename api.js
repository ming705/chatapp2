var express = require("express");
var chatDB = require("./data/chatDB");

var router = express.Router();
module.exports = router;

router.get("/rooms", function (req, res, next) {

  chatDB.connect
    .then(db => db.collection("rooms").find().toArray())
    .then(rooms => res.json(rooms))
    .catch(next);

});

router.get("/users", function (req, res, next) {

  chatDB.connect
    .then(db => db.collection("users").find().toArray())
    .then(users => res.json(users))
    .catch(next);

});

router.route("/rooms/:roomId/messages")
  .get(function (req, res, next) {
    var roomId = req.params.roomId;
    var msgFilter = {"room": roomId};

    chatDB.connect
    .then(db => db.collection("messages").find(msgFilter).toArray())
    .then(messages => {
      var roomMessages = messages.map(m => {
        return {text: `${m.user}: ${m.text}`};
      });

      res.json({
        room: roomId,
        messages: roomMessages
      })})
    .catch(next);

  })
  .post(function (req, res, next) {
    var roomId = req.params.roomId;

    var message = {
      text: req.body.text,
      room: roomId,      
      user: "mingsheng"
    };

    chatDB.connect
      .then(db => db.collection("messages").insertOne(message))
      .then(result => res.sendStatus(200))
      .catch(next);  
  })
  .delete(function (req, res, next) {
    var roomId = req.params.roomId;
    var filter = {room: roomId};
    chatDB.connect
    .then(db => db.collection("messages").deleteMany(filter))
    .then(result => res.sendStatus(200))
    .catch(next); 
  });