import React, { Component } from "react";
import { useContext, useState, useEffect } from "react";
// import { TicketContext } from "../contexts/TicketContext";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import * as io from "socket.io-client";

const Chat = (props) => {
  const [message, setMessage] = useState("");
  const { user, isAuthenticated } = useContext(AuthContext);
  const [validation, setValidation] = useState(""); //input validation message
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState([]);
  // var db = "";
  // if (process.env.DATABASE_URL) {
  //   db = process.env.DATABASE_URL;
  // } else {
  //   db = require("../../../keys").mongoURI;
  // }

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/api/chats");
      console.log(response.data);
      setData(response.data);
      // console.log(data);
      response.data.map((currentData, i) => {
        console.log("currentdata", currentData);
        // console.log("currentdata", currentData.message);
        setMessages((currentMessages) => [...currentMessages, currentData.message]);
      });
    };
    getData();

    //window.location.hostname is for heroku deploy
    var hostname = "http://localhost:5000";
    if (window.location.hostname.toString() != "localhost") {
      hostname = window.location.hostname;
    }
    const socket = io.connect(hostname);
    socket.on("chat message", function (msg) {
      setMessages((currentMessages) => [...currentMessages, msg]); //push ticket object to state array
    });
  }, []);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const send = (e) => {
    e.preventDefault();
    //window.location.hostname is for heroku deploy
    var hostname = "http://localhost:5000";
    if (window.location.hostname.toString() != "localhost") {
      hostname = window.location.hostname;
    }
    const socket = io.connect(hostname);

    //checks if empty
    socket.emit("chat message", message);
    setMessage("");
    var elem = document.getElementById("chatty");
    elem.scrollTop = elem.scrollHeight;
  };

  const displayMessages = () => {
    console.log(messages);
    // messages.map((currentMessage, i) => {
    //   return currentMessages;
    // });
    return messages.map((currentData, i) => {
      return <p className="chatMessage">{currentData}</p>;
    });
  };

  return (
    <div className="chatroom">
      <div id="messages">
        <h3>Chatroom</h3>
        <div id="chatty" className="chatbox">
          {displayMessages()}
        </div>
      </div>
      <div>
        <textarea className="chatinput" type="text" name="message" placeholder="Your Message Here" wrap="hard" value={message} onChange={handleChange} />
        <button className="chatSend" onClick={send}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
