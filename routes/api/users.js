const express = require("express");
const userRoutes = express.Router();
const passport = require("passport");
const passportConfig = require("../../passport");
const passportJWT = require("passport-jwt");
const JWT = require("jsonwebtoken");

// User model
const User = require("../../models/user.model");

const signToken = (userID) => {
  //JWT paylod
  return JWT.sign(
    {
      iss: "tonysgrotto",
      sub: userID, //subject
    },
    "tonysgrotto",
    { expiresIn: "1h" }
  );
};

//CREATE
userRoutes.post("/register", (req, res) => {
  const { username, password, role } = req.body;
  //check if username exists first
  User.findOne({ username }, (err, user) => {
    //error searching username
    if (err) res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
    //username already taken
    if (user) res.status(400).json({ message: { msgBody: "Username is already taken", msgError: true } });
    //if username doesnt exist yet
    else {
      const newUser = new User({ username, password, role });
      newUser.save((err) => {
        if (err) res.status(500).json({ message: { msgBody: err, msgError: true } });
        else res.status(201).json({ message: { msgBody: "Account successfully created", msgError: false } });
      });
    }
  });
});

// LOGIN
// "local coming from LocalStrategy in passport.js"
userRoutes.post("/login", passport.authenticate("local", { session: false }), (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.isAuthenticated());
    //req.user is coming from: password.use in passport.js uses comparepassword function, that function is in user.model.js which returns user object if password matches ('this')
    const { _id, username, role, avatar } = req.user;
    //creates JWT token
    const token = signToken(_id);
    //set cookie as access token. httpOnly protects from Cross-site scripting attacks, cannot steal cookie using javascript. sameSite protects from Cross-site forgery attacks
    res.cookie("access_token", token, { httpOnly: true, sameSite: true });
    res.status(200).json({ isAuthenticated: true, user: { _id, username, role, avatar }, message: { msgBody: "Account successfully logged in", msgError: false } });
  }
});

//LOGOUT
userRoutes.get("/logout", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.clearCookie("access_token");
  res.json({ user: { username: "", role: "" }, success: true });
});

//CHECK IF ADMIN
userRoutes.get("/admin", passport.authenticate("jwt", { session: false }), (req, res) => {
  if (req.user.role === "admin") {
    res.status(200).json({ message: { msgBody: "You are an admin", msgError: false } });
  } else res.status(403).json({ message: { msgBody: "You're not an admin,go away", msgError: true } });
});

//CHECK IF AUTHENTICATED
userRoutes.get("/authenticated", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { _id, username, role, avatar } = req.user;
  res.status(200).json({ isAuthenticated: true, user: { _id, username, role, avatar } });
});

// get current user object
userRoutes.get("/getuser", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json(req.user);
});

// get specific user by id
userRoutes.get("/:id", (req, res) => {
  let id = req.params.id;
  User.findById(id, function (err, user) {
    res.json(user);
  });
});

//get all users, should delete later
userRoutes.route("/").get(function (req, res) {
  User.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

module.exports = userRoutes;
