import React, { Component } from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ProfileContext } from "../contexts/ProfileContext";
import { ChatContext } from "../contexts/ChatContext";
import { SocketContext } from "../contexts/SocketContext";
import axios from "axios";
import moment from "moment";
import * as io from "socket.io-client";
import UsersOnline from "./UsersOnline";

const Chat = (props) => {
  const [message, setMessage] = useState("");
  const { user, isAuthenticated } = useContext(AuthContext);
  const { chats, setChats } = useContext(ChatContext);
  const { profiles, setProfiles, profLoaded } = useContext(ProfileContext);
  const { socket } = useContext(SocketContext);
  const [usersOnline, setUsersOnline] = useState([]);
  const [timeStamps, setTimeStamps] = useState([]);

  useEffect(() => {
    // socket.emit("get users");
    // socket.on("get users", (users) => {
    //   console.log("here!");
    //   console.log(users);
    // });
    //connect to socket io
    //window.location.hostname is for heroku deploy
    // var hostname = "http://localhost:5000";
    // if (window.location.hostname.toString() != "localhost") {
    //   hostname = window.location.hostname;
    // }
    // const socket = io.connect(hostname);
    // console.log(chats);
    // console.log(user);
    // //create user object to send
    if (isAuthenticated) {
      const authenticatedUser = {
        socketid: socket.id,
        username: user.username,
        userid: user._id,
        avatar: user.avatar,
      };
      socket.emit("authenticated user", authenticatedUser);

      socket.on("chat message", function (msg) {
        axios.post("api/chats/add", msg);
        setChats((currentChats) => [...currentChats, msg]); //push ticket object to state array
      });
      // socket.on("status", (s) => {
      //   console.log("status!");
      //   console.log(s);
      // });
      // socket.on("new user", (data) => {
      //   console.log("new user!");
      //   console.log(data);
      //   setUsersOnline((currentUsers) => [...currentUsers, data]);
      // });
    }

    // const getData = async () => {
    //   if (isAuthenticated) {
    //     console.log("getData was run!");
    //     const response = await axios.get("/api/chats");
    //     setData(response.data);
    //     response.data.map((currentData, i) => {
    //       setMessages((currentMessages) => [...currentMessages, currentData]);
    //     });
    //   } else {
    //     setMessages([]);
    //   }
    // };
    // window.location.hostname is for heroku deploy
    // uses promise so that connectSocket runs after getData is complete
    // getData();
    //rerenders when user logs in and user updates so that it notifies that the user has joined the chatroom
  }, [isAuthenticated]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const send = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      const newChat = {
        user: user,
        message: message,
      };

      // socket.on("chat message", function (msg) {
      //   axios.post("api/chats/add", msg);
      // });

      //window.location.hostname is for heroku deploy
      // var hostname = "http://localhost:5000";
      // if (window.location.hostname.toString() != "localhost") {
      //   hostname = window.location.hostname;
      // }
      // const socket = io.connect(hostname);

      let date = moment();
      let newDate = {
        seconds: date.seconds(),
        minutes: date.minutes(),
        hour: date.hours(),
        day: date.date(),
        month: date.month() + 1,
        year: date.year(),
      };

      let chatPacket = {
        user: user._id,
        message: message,
        timestamp: newDate,
      };
      socket.emit("chat message", chatPacket);

      setMessage("");

      var elem = document.getElementById("chatty");
      elem.scrollTop = elem.scrollHeight;
    }
  };

  const findProfile = (id) => {
    var tempProfile = {
      user: "",
      message: "",
    };
    profiles.filter((profile) => {
      if (profile._id === id) {
        tempProfile = {
          user: profile.username,
          avatar: profile.avatar,
        };
      }
    });
    return tempProfile;
  };

  const calcTime = (socketTimestamp) => {
    const socketSeconds = Number(socketTimestamp.seconds + socketTimestamp.minutes * 60 + socketTimestamp.hour * 3600);

    let date = moment();
    let newDate = {
      seconds: date.seconds(),
      minutes: date.minutes(),
      hour: date.hours(),
      day: date.date(),
      month: date.month() + 1,
      year: date.year(),
    };

    const currentSeconds = Number(newDate.seconds + newDate.minutes * 60 + newDate.hour * 3600);
    // console.log(socketSeconds);
    // console.log(currentSeconds);
    const secondsAgo = currentSeconds - socketSeconds;
    // console.log(secondsAgo);
    return Number(secondsAgo);
  };

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    // console.log(usersOnline);
    let timestamps = [];
    usersOnline.map((currentUser, i) => {
      let secondsAgo = calcTime(currentUser.timestamp);
      // console.log(Number(secondsAgo));
      let timestamp = {
        socketid: currentUser.socketid,
        time: secondsAgo,
      };
      timestamps.push(timestamp);
    });
    setTimeStamps(timestamps);
  }, 1000);

  const formatTime = (seconds) => {
    // console.log(seconds);
    if (seconds >= 60 && seconds < 120) {
      return "1 minute";
    } else if (seconds >= 3600 && seconds < 7200) {
      return "1 hour";
    } else if (seconds >= 86400 && seconds < 172800) {
      return Math.floor(seconds / 86400) + " day(s)";
    } else if (seconds > 60 && seconds < 3600) {
      return Math.floor(seconds / 60) + " minutes";
    } else if (seconds >= 7200 && seconds < 86400) {
      return Math.floor(seconds / 3600) + " hrs";
    } else if (seconds >= 172800) {
      return Math.floor(seconds / 86400) + " days";
    } else {
      return seconds + "s";
    }
  };

  const displayChats = () => {
    // console.log(chats);
    return chats.map((currentData, i) => {
      let tempProfile = findProfile(currentData.user);
      return (
        <div className="chatMessage">
          <span className="chatProfile">
            <span>
              <img src={tempProfile.avatar && require("../assets/avatars/" + tempProfile.avatar + ".png")} alt="Logo" width="15" />
              &nbsp;
            </span>
            <span>{tempProfile.user}:&nbsp;</span>
          </span>
          <span>{currentData.message}</span>
          <span className="chatTime">sent {formatTime(calcTime(currentData.timestamp))} ago.</span>
        </div>
      );
    });
  };

  const authenticatedChat = () => {
    return (
      <div className="chatroom">
        <div id="messages">
          <h3>Chatroom</h3>
          <div id="chatty" className="chatbox">
            {displayChats()}
          </div>
        </div>
        <div className="chatbar">
          <textarea className="chatinput" type="text" name="message" placeholder="Your Message Here" wrap="hard" value={message} onChange={handleChange} />
          <button className="chatSend" onClick={send}>
            Send
          </button>
        </div>
      </div>
    );
  };

  const unauthenticatedChat = () => {
    return (
      <div className="chatroom">
        <div id="messages">
          <h3>Chatroom</h3>
          <div id="chatty" className="chatbox">
            <div className="notLoggedIn">Must be logged in to access the chatroom</div>
          </div>
        </div>
        <div className="chatbar">
          <textarea className="chatinput" type="text" name="message" placeholder="Your Message Here" wrap="hard" value={message} onChange={handleChange} disabled />
          <button className="chatSend" onClick={null} disabled>
            Send
          </button>
        </div>
      </div>
    );
  };

  return <React.Fragment>{!isAuthenticated ? unauthenticatedChat() : authenticatedChat()}</React.Fragment>;
};

export default Chat;
