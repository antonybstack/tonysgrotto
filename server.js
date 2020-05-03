const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

//bodyparser middleware
app.use(bodyParser.json());

const db = process.env.DATABASE_URL;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console("error!!!", err));

const tickets = require("./routes/api/tickets");
app.use("/api/tickets", tickets);

//serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log("Server is running on Port: " + PORT));
