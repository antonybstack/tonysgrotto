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

// userRoutes.post("/register", (req, res) => {
//   const { username, password, role } = new User(req.body);
//   user
//     .save()
//     .then((user) => {
//       res.status(200).json({ user });
//     })
//     .catch((err) => {
//       res.status(400).send("adding new user failed");
//     });
// });

//create account
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

//login
// "local coming from LocalStrategy in passport.js"
userRoutes.post("/login", passport.authenticate("local", { session: false }), (req, res) => {
  if (req.isAuthenticated()) {
    //req.user is coming from: password.use in passport.js uses comparepassword function, that function is in user.model.js which returns user object if password matches ('this')
    const { _id, username, role } = req.user;
    //creates JWT token
    const token = signToken(_id);
    //set cookie as access token. httpOnly protects from Cross-site scripting attacks, cannot steal cookie using javascript. sameSite protects from Cross-site forgery attacks
    res.cookie("access_token", token, { httpOnly: true, sameSite: true });
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
  }
});

//logout
userRoutes.get("/logout", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.clearCookie("access_token");
  res.json({ user: { username: "", role: "" }, success: true });
});

// const userInput = {
//   username: "root",
//   password: "root",
//   role: "admin",
// };

// const user = new User(userInput);
// user.save((err, document) => {
//   if (err) console.log(err);
//   console.log(document);
// });

userRoutes.route("/").get(function (req, res) {
  User.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

// userRoutes.route("/:id").get(function (req, res) {
//   let id = req.params.id;
//   User.findById(id, function (err, user) {
//     res.json(user);
//   });
// });

// userRoutes.route("/delete/:id").delete(function (req, res) {
//   User.findByIdAndRemove(req.params.id, function (err, user) {
//     if (err) {
//       console.log(err);
//       return res.status(500).send({ user });
//     }
//     return res.status(200).send({ user });
//   });
// });

// userRoutes.route("/update/:id").post(function (req, res) {
//   User.findById(req.params.id, function (err, user) {
//     if (!user) res.status(404).send("data is not found");
//     else user.user_name = req.body.user_name;
//     user.user_status = req.body.user_status;

//     user
//       .save()
//       .then((user) => {
//         res.json({ user });
//       })
//       .catch((err) => {
//         res.status(400).send("Update not possible");
//       });
//   });
// });

module.exports = userRoutes;
