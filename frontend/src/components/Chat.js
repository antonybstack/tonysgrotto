import React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ProfileContext } from "../contexts/ProfileContext";
import { ChatContext } from "../contexts/ChatContext";
import { SocketContext } from "../contexts/SocketContext";
import { MobileContext } from "../contexts/MobileContext.js";
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
  const { windowSize } = useContext(MobileContext);
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
      // var elem = document.getElementById("chatty");
      // elem.scrollTop = elem.scrollHeight;
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

  useEffect(() => {
    if (windowSize.width < 850) {
      document.getElementById("rightSidepanelMobile").style.height = "0em";
      document.getElementById("rightSidepanelMobile").style.width = "calc(100% - .7em)";
      document.getElementById("rightSidepanelMobile").style.hidden = false;
    } else {
      document.getElementById("rightSidepanel").style.width = "25em";
      document.getElementById("rightSidepanel").style.height = "100%";
      document.getElementById("rightSidepanel").style.hidden = false;
    }
  }, [windowSize]);

  function toggleMenu() {
    if (windowSize.width < 850) {
      if (refElem.current.clientHeight === 0) {
        document.getElementById("rightSidepanelMobile").style.height = "15em";
        document.getElementById("rightSidepanelMobile").style.width = "calc(100% - .7em)";
      } else {
        document.getElementById("rightSidepanelMobile").style.height = "0em";
        document.getElementById("rightSidepanelMobile").style.width = "calc(100% - .7em)";
      }
    } else {
      if (refElem.current.clientWidth === 0) {
        document.getElementById("rightSidepanel").style.width = "25em";
        document.getElementById("rightSidepanel").style.height = "100%";
      } else {
        document.getElementById("rightSidepanel").style.width = "0em";
        document.getElementById("rightSidepanel").style.height = "100%";
      }
    }
  }

  const draggableChat = () => {
    return (
      <Draggable handle=".handle" defaultPosition={{ x: 0, y: 0 }}>
        <div className="chatroomDrag">
          <div className="handle">Click and hold to drag</div>
          <div id="messagesDrag">
            <h3>Chatroom</h3>
            <div id="chattyDrag" className="chatboxDrag">
              {displayChats()}
            </div>
          </div>
          {/* <div className="chatbar"> */}
          {/* <textarea className="chatinput" type="text" name="message" placeholder="Your Message Here" wrap="hard" value={message} onChange={handleChange} /> */}
          <Form inline>
            <FormControl className="chatinputDrag" as="textarea" placeholder="Your Message Here" wrap="hard" value={message} onChange={handleChange} />
            <Button className="chatSendDrag" variant="primary" onClick={send}>
              Send
            </Button>{" "}
          </Form>
          {/* <button className="chatSend" onClick={send}>
              Send
            </button> */}
          {/* </div> */}
          {errMessage ? <Message message={errMessage} /> : null}
          {user.role === "admin" ? (
            <button className="clearChatsDrag" onClick={clearChats}>
              clear
            </button>
          ) : null}
        </div>
      </Draggable>
    );
  };

  const displayChatroom = () => {
    return (
      <>
        <div className="chatTitle">Chatroom</div>
        <div className="chatContainer">
          <div id="chatMessages" className="chatMessages">
            {displayChats()}
          </div>
          <div className="chatbar">
            <textarea className="chatinput" type="text" name="message" placeholder="Your Message Here" wrap="hard" value={message} onChange={handleChange} />
            <button className="chatSend" onClick={send}>
              Send
            </button>
          </div>
        </div>
      </>
    );
  };

  const authenticatedChat = () => {
    return (
      <React.Fragment>
        <div className="chat">
          {user.role === "admin" ? (
            <button className="clearChats" onClick={clearChats}>
              clear
            </button>
          ) : null}
          {windowSize.width > 850 ? (
            <div id="rightSidepanel" className="chatroom" ref={refElem}>
              <>{displayChatroom()}</>
            </div>
          ) : (
            <div id="rightSidepanelMobile" className="chatroomMobile" ref={refElem}>
              <div className="displayChatroom">{displayChatroom()}</div>
            </div>
          )}
          <Button id="openbtn2" variant="info" onClick={toggleMenu}>
            <img src={require("../assets/chat.png")} alt="Chat" width="40" />
          </Button>
        </div>
      </React.Fragment>
    );
  };

  const unauthenticatedChat = () => {
    return (
      <React.Fragment>
        <div className="chat">
          {windowSize.width < 850 ? (
            <div id="rightSidepanelMobile" className="chatroomMobile" ref={refElem}>
              <div className="notLoggedIn">Must be logged in to chat</div>
            </div>
          ) : (
            <div id="rightSidepanel" className="chatroom" ref={refElem}>
              <div className="notLoggedIn">Must be logged in to chat</div>
            </div>
          )}
          <Button id="openbtn2" variant="info" onClick={toggleMenu}>
            <img src={require("../assets/chat.png")} alt="Chat" width="40" />
          </Button>
        </div>
      </React.Fragment>
    );
  };

  return <React.Fragment>{!isAuthenticated ? unauthenticatedChat() : authenticatedChat()}</React.Fragment>;
};

export default Chat;
