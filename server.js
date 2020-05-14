const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

//bodyparser middleware
app.use(express.json());
app.use(cookieParser());

var db = "";

if (process.env.DATABASE_URL) {
  db = process.env.DATABASE_URL;
} else {
  db = require("./keys").mongoURI;
}

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console("error!!!", err));

app.use("/api/tickets", require("./routes/api/tickets"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/chats", require("./routes/api/chats"));

//serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    // creating an index.html file in the directory and serve our html in there
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });
}

const server = http.createServer(app);
//initialize a new instance of socket.io by passing the http (the HTTP server) object
const io = socketIo(server);

//listen on the connection event for incoming sockets and log it to the console.

io.on("connection", (socket) => {
  console.log("USER CONNECTED...");
  sendStatus = function (s) {
    socket.emit("status", s);
  };

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    console.log(msg);
    sendStatus({
      message: "Message sent",
      clear: true,
    });
  });
});

server.listen(PORT, () => console.log("Server is running on Port: " + PORT));
// app.listen(PORT, () => console.log("Server is running on Port: " + PORT));
