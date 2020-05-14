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
    // console.log(data);

    const socket = io.connect(window.location.hostname);
    socket.on("chat message", function (msg) {
      setMessages((currentMessages) => [...currentMessages, msg]); //push ticket object to state array
    });
  }, []);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const send = (e) => {
    const socket = io.connect(window.location.hostname);
    e.preventDefault();
    //checks if empty
    socket.emit("chat message", message);
    var elem = document.getElementById("chatty");
    elem.scrollTop = elem.scrollHeight;
  };

  const test = () => {
    console.log(messages);
    // messages.map((currentMessage, i) => {
    //   return currentMessages;
    // });
    return messages.map((currentData, i) => {
      return <p>{currentData}</p>;
    });
  };

  return (
    <React.Fragment>
      <div id="messages">
        <h1>Chat Room</h1>
        <div id="chatty" className="chatbox">
          {test()}
        </div>
      </div>
      <div>
        <textarea className="chatinput" type="text" name="message" placeholder="Your Message Here" value={message} onChange={handleChange} />
        <button onClick={send}>Send</button>
      </div>
    </React.Fragment>
  );
};

export default Chat;
