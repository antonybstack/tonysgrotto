const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Chat = new Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectID,
  //   required: "User is required",
  //   ref: "User",
  // },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "User is required",
  },
  message: {
    type: String,
    required: "Message is required",
  },
});

module.exports = mongoose.model("Chat", Chat);
