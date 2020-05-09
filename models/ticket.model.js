const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Ticket = new Schema({
  ticket_name: {
    type: String,
  },
  ticket_status: {
    type: String,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Ticket = mongoose.model("Ticket", Ticket);
