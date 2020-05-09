const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // hash/encrypts passwords, if database get compormised, the hacker wont have access to everyones passwords
const Schema = mongoose.Schema;

let User = new Schema({
  username: {
    type: String,
    required: true,
    min: 4,
    max: 20,
  },
  password: {
    type: String,
    required: true,
    min: 4,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
  avatar: {
    type: Number,
    default: function () {
      return Math.floor(Math.random() * Math.floor(18));
    },
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});

//this hashes a passwords before we save the password
User.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err);
    this.password = passwordHash;
    next();
  });
});

// for when the user signs in and needs to compare passwords to hashed password
User.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    else {
      if (!isMatch) return cb(null, isMatch);
      return cb(null, this);
    }
  });
};

module.exports = mongoose.model("User", User);
