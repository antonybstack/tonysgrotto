import React, { Component } from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ProfileContext } from "../contexts/ProfileContext";
import { ChatContext } from "../contexts/ChatContext";
import { SocketContext } from "../contexts/SocketContext";
import axios from "axios";
import moment from "moment";
import moment_timezone from "moment-timezone";

const Chat = (props) => {
  const [message, setMessage] = useState("");
  const { user, isAuthenticated } = useContext(AuthContext);
  const { chats, setChats } = useContext(ChatContext);
  const { profiles } = useContext(ProfileContext);
  const { socket } = useContext(SocketContext);
  const [usersOnline, setUsersOnline] = useState([]);
  const [timeStamps, setTimeStamps] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      const authenticatedUser = {
        socketid: socket.id,
        username: user.username,
        userid: user._id,
        avatar: user.avatar,
      };
      socket.emit("authenticated user", authenticatedUser);
      socket.on("chat message", function (msg) {
        socket.on("status", (statusMessage) => {
          console.log(statusMessage);
        });
        console.log(msg);
        setChats((currentChats) => [...currentChats, msg]); //push chat object to state array
      });
    }
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

      let date = moment().tz("America/New_York");
      let chatPacket = {
        user: user._id,
        message: message,
        timestamp: date,
      };
      console.log("HEEEEERE :)");
      console.log(window.location.hostname);
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
    let date = moment().tz("America/New_York");
    const currentSeconds = moment(date).diff(moment().startOf("day"), "seconds");
    const socketSeconds = moment(socketTimestamp).diff(moment().startOf("day"), "seconds");
    const secondsAgo = currentSeconds - socketSeconds;
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
    let timestamps = [];
    usersOnline.map((currentUser, i) => {
      let secondsAgo = calcTime(currentUser.timestamp);
      let timestamp = {
        socketid: currentUser.socketid,
        time: secondsAgo,
      };
      timestamps.push(timestamp);
    });
    setTimeStamps(timestamps);
  }, 1000);

  const formatTime = (seconds) => {
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

  const clearChats = () => {
    chats.map((t, index) => {
      axios.delete("api/chats/delete/" + t._id);
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
        <button className="clearChats" onClick={clearChats}>
          clear
        </button>
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
