const express = require("express");
const chatRoutes = express.Router();

// chat model
const Chat = require("../../models/chat.model");

chatRoutes.route("/").get(function (req, res) {
  Chat.find({}, (err, chats) => {
    res.send(chats);
  });
});

chatRoutes.route("/add").post(function (req, res) {
  var chat = new Chat(req.body);
  chat.save((err) => {
    if (err) sendStatus(500);
    res.sendStatus(200);
  });
});

chatRoutes.route("/delete/:id").delete(function (req, res) {
  Chat.findByIdAndRemove(req.params.id, function (err, chat) {
    if (err) {
      return res.status(500).send({ chat });
    }
    return res.status(200).send({ chat });
  });
});

module.exports = chatRoutes;
