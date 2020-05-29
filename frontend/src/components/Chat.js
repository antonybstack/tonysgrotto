import React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ProfileContext } from "../contexts/ProfileContext";
import { ChatContext } from "../contexts/ChatContext";
import { SocketContext } from "../contexts/SocketContext";
import Message from "../components/Message";
import axios from "axios";
import moment from "moment-timezone";
import Draggable, { DraggableCore } from "react-draggable";
import { FormControl, Button, Form } from "react-bootstrap";

const Chat = (props) => {
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState(null);
  const { user, isAuthenticated } = useContext(AuthContext);
  const { chats, setChats } = useContext(ChatContext);
  const { profiles } = useContext(ProfileContext);
  const { socket } = useContext(SocketContext);
  const [count, setCount] = useState(0);
  console.log("Chat");

  const refElem = useRef();

  useEffect(() => {
    setInterval(() => {
      setCount((prevTime) => prevTime + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    setErrMessage(null);
    if (isAuthenticated) {
      const authenticatedUser = {
        socketid: socket.id,
        username: user.username,
        userid: user._id,
        avatar: user.avatar,
      };
      socket.emit("authenticated user", authenticatedUser);
      socket.on("chat message", function (msg) {
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
    if (message === "") {
      setErrMessage({ msgBody: "message cannot be empty", msgError: true });
    } else if (isAuthenticated) {
      setErrMessage(null);
      let date = moment().tz("America/New_York");
      let chatPacket = {
        user: user._id,
        message: message,
        timestamp: date,
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
    profiles.forEach((profile) => {
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

  const formatTime = (seconds) => {
    if (seconds >= 60 && seconds < 120) {
      return "1 minute";
    } else if (seconds >= 3600 && seconds < 7200) {
      return "1 hour";
    } else if (seconds >= 86400 && seconds < 172800) {
      return Math.floor(seconds / 86400) + " day";
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
        <div className="chatMessage" key={i}>
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

  const clearChats = async () => {
    var temp;
    const updateBeforeClear = async () => {
      await axios.get("/api/chats").then((res) => {
        temp = res.data;
      });
    };
    await updateBeforeClear();

    temp.forEach((t) => {
      axios.delete("api/chats/delete/" + t._id);
    });

    setChats([]);

    let date = moment().tz("America/New_York");
    let chatPacket = {
      user: user._id,
      message: "***chats cleared***",
      timestamp: date,
    };
    setChats((currentChats) => [...currentChats, chatPacket]);
  };

  function toggleMenu() {
    console.log(refElem);

    if (refElem.current.clientWidth === 0) {
      document.getElementById("rightSidepanel").style.width = "15em";
    } else {
      document.getElementById("rightSidepanel").style.width = "0em";
    }
    document.getElementById("rightSidepanel").style.width = "20em";
  }

  const draggableChat = () => {
    return (
      <Draggable handle=".handle" defaultPosition={{ x: 0, y: 0 }}>
        <div className="chatroom">
          <div className="handle">Click and hold to drag</div>
          <div id="messages">
            <h3>Chatroom</h3>
            <div id="chatty" className="chatbox">
              {displayChats()}
            </div>
          </div>
          {/* <div className="chatbar"> */}
          {/* <textarea className="chatinput" type="text" name="message" placeholder="Your Message Here" wrap="hard" value={message} onChange={handleChange} /> */}
          <Form inline>
            <FormControl className="chatinput" as="textarea" placeholder="Your Message Here" wrap="hard" value={message} onChange={handleChange} />
            <Button className="chatSend" variant="primary" onClick={send}>
              Send
            </Button>{" "}
          </Form>
          {/* <button className="chatSend" onClick={send}>
              Send
            </button> */}
          {/* </div> */}
          {errMessage ? <Message message={errMessage} /> : null}
          {user.role === "admin" ? (
            <button className="clearChats" onClick={clearChats}>
              clear
            </button>
          ) : null}
        </div>
      </Draggable>
    );
  };

  const displayChatroom = () => {
    return (
      <div>
        <div className="handle">Click and hold to drag</div>
        <div id="messages">
          <h3>Chatroom</h3>
          <div id="chatty" className="chatbox">
            {displayChats()}
          </div>
        </div>
        {/* <div className="chatbar"> */}
        {/* <textarea className="chatinput" type="text" name="message" placeholder="Your Message Here" wrap="hard" value={message} onChange={handleChange} /> */}
        <Form inline>
          <FormControl className="chatinput" as="textarea" placeholder="Your Message Here" wrap="hard" value={message} onChange={handleChange} />
          <Button className="chatSend" variant="primary" onClick={send}>
            Send
          </Button>{" "}
        </Form>
        {errMessage ? <Message message={errMessage} /> : null}
        {user.role === "admin" ? (
          <button className="clearChats" onClick={clearChats}>
            clear
          </button>
        ) : null}
      </div>
    );
  };

  const authenticatedChat = () => {
    return (
      <React.Fragment>
        <div className="chat">
          <Button id="openbtn" onClick={toggleMenu}>
            <span className="test">Chat</span>
          </Button>
          <div id="rightSidepanel" className="chatroom" ref={refElem}>
            {/* <h5>Users Currently Online:</h5> */}
            <div className="displayChatroom">{displayChatroom()}</div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const unauthenticatedChat = () => {
    return (
      <Draggable handle=".handle">
        <div className="chatroom">
          <div className="handle">Click and hold to drag</div>
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
      </Draggable>
    );
  };

  return <React.Fragment>{!isAuthenticated ? unauthenticatedChat() : authenticatedChat()}</React.Fragment>;
};

export default Chat;
