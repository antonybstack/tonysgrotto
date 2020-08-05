const express = require("express");
const professorTHRoutes = express.Router();

// ProfessorTH model
const ProfessorTH = require("../../models/professorTH.model");

professorTHRoutes.route("/").get(function (req, res) {
  ProfessorTH.find(function (err, professorTHs) {
    if (err) {
    } else {
      res.json(professorTHs);
    }
  });
});

professorTHRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  ProfessorTH.findById(id, function (err, professorTH) {
    res.json(professorTH);
  });
});

professorTHRoutes.route("/add").post(function (req, res, err) {
  let professorTH = new ProfessorTH(req.body);
  professorTH
    .save()
    .then((professorTH) => {
      res.status(200).json({ professorTH });
    })
    .catch((err) => {
      res.status(400).json({ message: { msgBody: "ProfessorTH requires name", msgError: true } });
    });
});

professorTHRoutes.route("/delete/:id").delete(function (req, res) {
  ProfessorTH.findByIdAndRemove(req.params.id, function (err, professorTH) {
    if (err) {
      return res.status(500).send({ professorTH });
    }
    return res.status(200).send({ professorTH });
  });
});

module.exports = professorTHRoutes;
