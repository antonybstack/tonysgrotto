require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const ticketRoutes = express.Router();
const PORT = 8080;

var path = require("path");
let Ticket = require("./ticket.model");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
  console.log(error);
});

// mongoose.connect("mongodb+srv://root:8KGyNMig6jwxfz7A@mern-bugtracker-5mdvs.gcp.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
//   console.log(error);
// });

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
      res.status(200).json({ ticket });
    })
    .catch((err) => {
      res.status(400).send("adding new ticket failed");
    });
});

ticketRoutes.route("/delete/:id").delete(function (req, res) {
  Ticket.findByIdAndRemove(req.params.id, function (err, ticket) {
    if (err) {
      console.log(err);
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
        res.status(400).send("Update not possible");
      });
  });
});

app.use("/tickets", ticketRoutes);
app.use(express.static(path.join(__dirname, "frontend/build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build/index.html"));
});

app.listen(process.env.port || 8080, () => {
  console.log("Express app is running on port 8080");
});
