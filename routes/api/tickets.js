const express = require("express");
const ticketRoutes = express.Router();

// Ticket model
const Ticket = require("../../models/ticket.model");

ticketRoutes.route("/").get(function (req, res) {
  Ticket.find(function (err, tickets) {
    if (err) {
    } else {
      res.json(tickets);
    }
  });
});

ticketRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Ticket.findById(id, function (err, ticket) {
    res.json(ticket);
  });
});

ticketRoutes.route("/add").post(function (req, res, err) {
  let ticket = new Ticket(req.body);
  ticket
    .save()
    .then((ticket) => {
      res.status(200).json({ ticket });
    })
    .catch((err) => {
      res.status(400).json({ message: { msgBody: "Ticket requires name", msgError: true } });
    });
});

ticketRoutes.route("/delete/:id").delete(function (req, res) {
  Ticket.findByIdAndRemove(req.params.id, function (err, ticket) {
    if (err) {
      return res.status(500).send({ ticket });
    }
    return res.status(200).send({ ticket });
  });
});

ticketRoutes.route("/update/:id").post(function (req, res) {
  Ticket.findById(req.params.id, function (err, ticket) {
    if (!ticket) res.status(404).send("data is not found");
    else ticket.ticket_name = req.body.ticket_name;
    ticket.ticket_status = req.body.ticket_status;

    ticket
      .save()
      .then((ticket) => {
        res.json({ ticket });
      })
      .catch((err) => {
        res.status(400).json({ message: { msgBody: "Ticket requires name", msgError: true } });
      });
  });
});

module.exports = ticketRoutes;
