const express = require("express");
const userRoutes = express.Router();

// User model
const User = require("../../models/user.model");

userRoutes.route("/").get(function (req, res) {
  User.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

userRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, user) {
    res.json(user);
  });
});

userRoutes.route("/add").post(function (req, res) {
  let user = new User(req.body);
  user
    .save()
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((err) => {
      res.status(400).send("adding new user failed");
    });
});

userRoutes.route("/delete/:id").delete(function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(500).send({ user });
    }
    return res.status(200).send({ user });
  });
});

userRoutes.route("/update/:id").post(function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (!user) res.status(404).send("data is not found");
    else user.user_name = req.body.user_name;
    user.user_status = req.body.user_status;

    user
      .save()
      .then((user) => {
        res.json({ user });
      })
      .catch((err) => {
        res.status(400).send("Update not possible");
      });
  });
});

module.exports = userRoutes;
