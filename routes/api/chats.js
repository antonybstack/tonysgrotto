const express = require("express");
const chatRoutes = express.Router();

// chat model
const Chat = require("../../models/chat.model");

chatRoutes.route("/").get(function (req, res) {
  Chat.find({}, (err, chats) => {
    res.send(chats);
  });
  // Chat.find(function (err, chats) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.json(chats);
  //   }
  // });
});

chatRoutes.route("/add").post(function (req, res) {
  var chat = new Chat(req.body);
  chat.save((err) => {
    if (err) sendStatus(500);
    // io.emit("chat", req.body);
    res.sendStatus(200);
  });
  // let chat = new Chat(req.body);
  // console.log("route log", req.body, res.body);
  // chat
  //   .save(io.emit("message", req.body))
  //   .then((chat) => {
  //     res.status(200).json({ chat });
  //   })
  //   .catch((err) => {
  //     res.status(400).send("adding new chat failed");
  //   });
});

// chatRoutes.route("/:id").get(function (req, res) {
//   let id = req.params.id;
//   Chat.findById(id, function (err, chat) {
//     res.json(chat);
//   });
// });

// chatRoutes.route("/add").post(function (req, res) {
//   let chat = new Chat(req.body);
//   console.log("route log", req.body, res.body);
//   chat
//     .save()
//     .then((chat) => {
//       res.status(200).json({ chat });
//     })
//     .catch((err) => {
//       res.status(400).send("adding new chat failed");
//     });
// });

// chatRoutes.route("/delete/:id").delete(function (req, res) {
//   Chat.findByIdAndRemove(req.params.id, function (err, chat) {
//     if (err) {
//       console.log(err);
//       return res.status(500).send({ chat });
//     }
//     return res.status(200).send({ chat });
//   });
// });

// chatRoutes.route("/update/:id").post(function (req, res) {
//   Chat.findById(req.params.id, function (err, chat) {
//     if (!chat) res.status(404).send("data is not found");
//     else chat.chat_name = req.body.chat_name;
//     chat.chat_status = req.body.chat_status;

//     chat
//       .save()
//       .then((chat) => {
//         res.json({ chat });
//       })
//       .catch((err) => {
//         res.status(400).send("Update not possible");
//       });
//   });
// });

module.exports = chatRoutes;
