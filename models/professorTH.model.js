const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // hash/encrypts passwords, if database get compormised, the hacker wont have access to everyones passwords
const Schema = mongoose.Schema;

let ProfessorTH = new Schema({
  tFname: {
    type: String,
  },
  tMiddlename: {
    type: String,
  },
  tLname: {
    type: String,
  },
  tid: {
    type: String,
  },
  tNumRatings: {
    type: Number,
  },
  overall_rating: {
    type: Number,
  },
});

module.exports = mongoose.model("ProfessorTH", ProfessorTH);
