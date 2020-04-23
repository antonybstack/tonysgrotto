const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Ticket = new Schema({
  ticket_name: {
    type: String,
  },
  ticket_status: {
    type: String,
  },
});

module.exports = mongoose.model("Ticket", Ticket);
