import React, { Component } from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ProfileContext } from "../contexts/ProfileContext";
import { ChatContext } from "../contexts/ChatContext";
import { SocketContext } from "../contexts/SocketContext";
import axios from "axios";
import * as io from "socket.io-client";
import UsersOnline from "./UsersOnline";

const Chat = (props) => {
  const [message, setMessage] = useState("");
  const { user, isAuthenticated } = useContext(AuthContext);
  const { chats, setChats } = useContext(ChatContext);
  const { profiles, setProfiles, profLoaded } = useContext(ProfileContext);
  const { socket } = useContext(SocketContext);
  const [usersOnline, setUsersOnline] = useState([]);

  useEffect(() => {
    console.log(socket.id);

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

      axios.post("api/chats/add", newChat);

      //window.location.hostname is for heroku deploy
      // var hostname = "http://localhost:5000";
      // if (window.location.hostname.toString() != "localhost") {
      //   hostname = window.location.hostname;
      // }
      // const socket = io.connect(hostname);

      let chatPacket = {
        user: user._id,
        message: message,
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

  const displayChats = () => {
    console.log(chats);
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
        <div className="usersOnline">
          <h5>Users Currently Online:</h5>
          <UsersOnline />
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
        <div className="usersOnline">
          <h5>Users Currently Online:</h5>
          <UsersOnline />
        </div>
      </div>
    );
  };

  return <React.Fragment>{!isAuthenticated ? unauthenticatedChat() : authenticatedChat()}</React.Fragment>;
};

export default Chat;
