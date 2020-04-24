const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const ticketRoutes = express.Router();
const PORT = 4000;

let Ticket = require("./ticket.model");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/tickets", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

ticketRoutes.route("/").get(function (req, res) {
  Ticket.find(function (err, tickets) {
    if (err) {
      console.log(err);
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

ticketRoutes.route("/add").post(function (req, res) {
  let ticket = new Ticket(req.body);
  ticket
    .save()
    .then((ticket) => {
      res.status(200).json({ ticket: "ticket added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding new ticket failed");
    });
});

ticketRoutes.route("/delete/:id").delete(function (req, res) {
  Ticket.findByIdAndRemove(req.params.id, function (err, ticket) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    return res.status(200).send();
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
        res.json("Ticket updated");
      })
      .catch((err) => {
        res.status(400).send("Update not possible");
      });
  });
});

app.use("/tickets", ticketRoutes);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
