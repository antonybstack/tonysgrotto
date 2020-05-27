const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Chat = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: "User is required",
    },
    message: {
      type: String,
      required: "Message is required",
    },
    timestamp: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  { minimize: false }
);

module.exports = mongoose.model("Chat", Chat);
