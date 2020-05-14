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

  const socket = io.connect("http://127.0.0.1:5000");

  console.log(socket);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const validate = (message) => {
    if (message === "") {
      setValidation("field cannot be empty");
      return false;
    } else {
      setValidation("");
      return true;
    }
  };

  const send = (e) => {
    e.preventDefault();
    //checks if empty

    socket.emit("chat message", message);
    addMessages();
  };

  const addMessages = () => {
    socket.on("chat message", function (msg) {
      // $("#messages").append($("<li>").text(msg));
      setMessages((currentMessages) => [...currentMessages, msg]);
    });
  };

  //   socket.on("message", addMessages());

  return (
    <React.Fragment>
      <div id="messages">
        <h1>Chat Room</h1>
        {messages.map((currentMessage, i) => (
          <div>{currentMessage}</div>
        ))}
      </div>
      <div>
        <textarea type="text" name="message" placeholder="Your Message Here" value={message} onChange={handleChange} />
        <button onClick={send}>Send</button>
      </div>
    </React.Fragment>
  );
};

export default Chat;
