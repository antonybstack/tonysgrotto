const express = require("express");
const professorRoutes = express.Router();

// Professor model
const Professor = require("../../models/professor.model");

professorRoutes.route("/").get(function (req, res) {
  Professor.find(function (err, professors) {
    if (err) {
    } else {
      res.json(professors);
    }
  });
});

professorRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Professor.findById(id, function (err, professor) {
    res.json(professor);
  });
});

professorRoutes.route("/add").post(function (req, res, err) {
  let professor = new Professor(req.body);
  professor
    .save()
    .then((professor) => {
      res.status(200).json({ professor });
    })
    .catch((err) => {
      res.status(400).json({ message: { msgBody: "Professor requires name", msgError: true } });
    });
});

professorRoutes.route("/delete/:id").delete(function (req, res) {
  Professor.findByIdAndRemove(req.params.id, function (err, professor) {
    if (err) {
      return res.status(500).send({ professor });
    }
    return res.status(200).send({ professor });
  });
});

module.exports = professorRoutes;
