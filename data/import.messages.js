var messages = require(__dirname + "/messages.json");
var chatDB = require("./chatDB");

chatDB.Message.insertMany(messages)
  .then(() => {
    console.log("inserted!");
    chatDB.close();
  })
  .catch(error => {
    console.error(error);
    chatDB.close();
  });
