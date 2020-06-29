const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const moment = require("moment-timezone");
const axios = require("axios");

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
  .catch((err) => console("mongoose connection error!", err));

app.use("/api/tickets", require("./routes/api/tickets"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/chats", require("./routes/api/chats"));
app.use("/api/professors", require("./routes/api/professors"));

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

// global io variable
connections = [];

io.on("connection", (socket) => {
  //on socket connection, new guest account is created
  console.log("USER CONNECTED...", socket.id);
  let num = Math.floor(Math.random() * Math.floor(999999));
  let date = moment().tz("America/New_York");
  newUser = {
    socketid: socket.id,
    username: "guest" + num,
    userid: "0",
    avatar: "99",
    timestamp: date,
  };
  connections.push(newUser);
  console.log("IO connection est. --> Current connections: ", connections);

  // GET CONNECTION custom event
  socket.on("get connections", () => {
    io.emit("get connections", connections);
  });

  //CHAT MESSAGE custom event
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);

    // server side HTTP request
    const addChat = async () => {
      await axios
        .post("http://localhost:5000/api/chats/add", msg)
        .then((res) => {
          console.log("chat added!", msg);
        })
        .catch(function (error) {
          console.log(error);
          axios
            .post("http://tonysgrotto.herokuapp.com/api/chats/add", msg)
            .then((res) => {
              console.log("chat added!", msg);
            })
            .catch(function (error) {
              console.log(error);
            });
        });
    };
    addChat();

    console.log(msg);
  });

  //AUTHENTICATED USER custom event
  socket.on("authenticated user", function (data) {
    let date = moment().tz("America/New_York");

    newUser = {
      socketid: data.socketid,
      username: data.username,
      userid: data.userid,
      avatar: data.avatar,
      timestamp: date,
    };

    if (connections.length > 0) {
      for (var i = 0; i < connections.length; i++) {
        if (connections[i].socketid === data.socketid) {
          connections.splice(i, 1);
        }
      }
    }
    connections.push(newUser);

    io.emit("authenticated user", connections);

    console.log("authenticated user function --> Current Users: ", connections);
  });

  //DISCONNECT custom event
  socket.on("disconnect", (data) => {
    for (var i = 0; i < connections.length; i++) {
      if (connections[i].socketid === socket.id) {
        connections.splice(i, 1);
      }
    }
    io.emit("disconnect", connections);
    console.log("Client disconnected.", "Current Users: ", connections);
    console.log("disconnected data: ", socket.id);
  });
});

server.listen(PORT, () => console.log("Server is running on Port: " + PORT));
