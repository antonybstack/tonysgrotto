const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// let date = new Date();
// let newDate = {
//   seconds: date.getSeconds(),
//   minutes: date.getMinutes(),
//   hour: date.getHours(),
//   day: date.getDate(),
//   month: date.getMonth(),
//   year: date.getFullYear(),
// };

let Chat = new Schema(
  {
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
    timestamp: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  { minimize: false }
);

module.exports = mongoose.model("Chat", Chat);
