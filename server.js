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

// var usersOnline = 0;

users = [];
connections = [];

io.on("connection", (socket) => {
  var loggedIn = true;
  var loggedInTimer = 0;

  console.log("USER CONNECTED...", socket.id);
  // let currentSocket;
  // for (var key in socket.nsp.connected) {
  //   if (socket.nsp.connected.hasOwnProperty(key)) {
  //     currentSocket = key;
  //   }
  // }
  // console.log("Connected --> Socket: ", currentSocket);

  console.log("IO connection function --> Current Users:: ", users);
  let num = Math.floor(Math.random() * Math.floor(999999));
  // usersOnline++;

  var date = new Date();
  let newDate = {
    seconds: date.getSeconds(),
    minutes: date.getMinutes(),
    hour: date.getHours(),
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };

  newUser = {
    socketid: socket.id,
    username: "guest" + num,
    userid: "0",
    avatar: "99",
    timestamp: newDate,
  };
  connections.push(newUser);
  console.log("Connected --> Connections: ", connections);
  //console.log("Connected: %s sockets connected", connections.length);
  // io.sockets.emit("broadcast", usersOnline + " people online!");

  getConnections = function () {
    // socket.emit("connections");
    console.log("blah blah", connections);
  };

  socket.on("get connections", () => {
    io.emit("get connections", connections);
    // getConnections({
    //   message: "test",
    // });
  });

  sendStatus = function (s) {
    socket.emit("status", s);
    let connections = io.sockets.connected;
    for (let c in connections) {
      let socketSessionID = connections[c].conn.id;
      console.log("SendStatus function--> ", socketSessionID);
      // if(sessionID === socketSessionID) {
      //   connections[c].disconnect();
      // }
    }
    // console.log(io.sockets.clients().connected[0]);
    // console.log(io.of("/").clients().connected);
  };

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    console.log(msg);
    sendStatus({
      message: "Message sent",
      clear: true,
    });
  });

  socket.on("authenticated user", function (data) {
    var date = new Date();
    let newDate = {
      seconds: date.getSeconds(),
      minutes: date.getMinutes(),
      hour: date.getHours(),
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };

    newUser = {
      socketid: data.socketid,
      username: data.username,
      userid: data.userid,
      avatar: data.avatar,
      timestamp: newDate,
    };

    for (var i = 0; i < connections.length; i++) {
      console.log("sldkjfsldfjk", connections[i].socketid, socket.id);
      if (connections[i].socketid === data.socketid) {
        connections.splice(i, 1);
      }
    }

    connections.push(newUser);
    // users.push(socket.username);
    // updateUsernames();

    io.emit("authenticated user", connections);

    console.log("authenticated user function --> Data: ", data);
    console.log("authenticated user function --> Current Users:: ", connections);
  });

  socket.on("guest user", function (data) {
    var date = new Date();
    let newDate = {
      seconds: date.getSeconds(),
      minutes: date.getMinutes(),
      hour: date.getHours(),
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };

    newUser = {
      socketid: data.socketid,
      username: data.username,
      userid: data.userid,
      avatar: data.avatar,
      timestamp: newDate,
    };

    connections.push(newUser);
    // users.push(socket.username);
    // updateUsernames();

    io.emit("guest user", connections);

    console.log("Guest user function --> Data: ", data);
    console.log("Guest user function --> Current Users:: ", connections);
  });

  socket.on("disconnect", (data) => {
    for (var i = 0; i < connections.length; i++) {
      console.log("sldkjfsldfjk", connections[i].socketid, socket.id);
      if (connections[i].socketid === socket.id) {
        connections.splice(i, 1);
      }
    }
    io.emit("disconnect", connections);
    console.log("Client disconnected. Reason: ", "Current Users: ", connections);
    console.log("disconnected data: ", socket.id);
  });
});

server.listen(PORT, () => console.log("Server is running on Port: " + PORT));
