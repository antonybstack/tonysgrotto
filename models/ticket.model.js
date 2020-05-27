const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Ticket = new Schema({
  ticket_name: {
    type: String,
    required: "Message is required",
  },
  ticket_status: {
    type: String,
    required: "Status is required",
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Ticket = mongoose.model("Ticket", Ticket);
