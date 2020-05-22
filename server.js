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
  function currentUsers() {
    io.sockets.emit("get users", users);
  }
  console.log("USER CONNECTED...");
  // usersOnline++;
  connections.push(socket);
  console.log("Connected: %s sockets connected", connections.length);
  // io.sockets.emit("broadcast", usersOnline + " people online!");

  sendStatus = function (s) {
    socket.emit("status", s);
    let connections = io.sockets.connected;
    for (let c in connections) {
      let socketSessionID = connections[c].conn.id;
      console.log(socketSessionID);
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

  socket.on("new user", function (data) {
    io.emit("new user", data);
    console.log(data);
    socket.user = {
      username: data.username,
      userid: data.userid,
      avatar: data.avatar,
    };
    console.log(socket.user);
    users.push(socket.user);
    console.log(users);
    // users.push(socket.username);
    // updateUsernames();
    sendStatus({
      message: "Message sent",
      clear: true,
    });
    currentUsers();
  });

  socket.on("disconnect", (data) => {
    console.log("Client disconnected. Reason: ", data);
    // users.splice(users.id.indexOf(socket.user.id), 1);
    // if (typeof socket.user.userid === 'undefined') console.log("socket", socket.user.userid);
    console.log(data);
    console.log(socket.user);
    // io.sockets.emit("logout", "user information:" + data);
    // if (typeof socket.user.userid === "undefined") console.log("undef");
    // if (typeof users !== "undefined") {
    //   console.log("user[0]", users[0]);
    //   console.log("user[0][1]", users[0].userid);
    //   console.log(users);
    // }
    // users.forEach(function (user) {
    //   var x = arrayItem.prop1 + 2;
    //   console.log(x);
    // });
    if (users !== "undefined") {
      for (var i = 0; i <= users.length; i++) {
        if (users[i] === socket.user) {
          users.splice(users.indexOf(socket.user), 1);
        }
      }
    }

    currentUsers();
    // connections.splice(connections.indexOf(socket), 1);
    // console.log('Disconnected: %s socket connected', connections.length)
    // io.sockets.emit("broadcast", usersOnline + " people online!");
  });
});

server.listen(PORT, () => console.log("Server is running on Port: " + PORT));
// app.listen(PORT, () => console.log("Server is running on Port: " + PORT));
