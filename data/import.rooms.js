var rooms = require(__dirname + "/rooms.json");
var chatDB = require("./chatDB");

chatDB.Room.insertMany(rooms)
  .then(() => {
    console.log("inserted!");
    chatDB.close();
  })
  .catch(error => {
    console.error(error);
    chatDB.close();
  });