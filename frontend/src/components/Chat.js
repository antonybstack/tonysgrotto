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

  useEffect(() => {
    if (document.getElementById("chatMessages")) {
      var elem = document.getElementById("chatMessages");
      elem.scrollTop = elem.scrollHeight;
    }
  }, [chats]);

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
      var elem = document.getElementById("chatMessages");
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

  const formatTime = (seconds) => {
    if (seconds >= 60 && seconds < 120) {
      return "1 min ago";
    } else if (seconds > 60 && seconds < 3600) {
      return Math.floor(seconds / 60) + " mins ago";
    } else {
      return seconds + "s ago";
    }
  };

  const calcTime = (socketTimestamp) => {
    let date = moment().tz("America/New_York");
    const currentSeconds = moment(date).diff(moment().startOf("day"), "seconds");
    const socketSeconds = moment(socketTimestamp).diff(moment().startOf("day"), "seconds");
    const secondsAgo = currentSeconds - socketSeconds;

    if (secondsAgo < 3600) {
      return formatTime(secondsAgo);
    } else {
      return moment(socketTimestamp).format("h:mm a MMM Do");
    }
  };

  var nextUser;

  const displayChats = () => {
    return chats.map((currentData, i, array) => {
      if (array[i + 1] !== undefined) {
        nextUser = array[i + 1].user;
      } else {
        nextUser = null;
      }
      let tempProfile = findProfile(currentData.user);
      return (
        <>
          {currentData.user !== user._id ? (
            <div className="chatBlock" key={i}>
              <div className="chatMessage">
                <div className="chatProfile">
                  <span>
                    <img src={tempProfile.avatar && require("../assets/avatars/" + tempProfile.avatar + ".png")} alt="Logo" width="15" />
                    &nbsp;
                  </span>
                  <span>{tempProfile.user}</span>
                </div>
                <div className="msgContainer">{currentData.message}</div>
                {/* <span className="chatTime">{formatTime(calcTime(currentData.timestamp))} ago.</span> */}
              </div>
              {currentData.user !== nextUser ? <div className="chatTime">{calcTime(currentData.timestamp)}</div> : null}
            </div>
          ) : (
            <div className="chatBlock" key={i}>
              <div className="chatYourMessage">
                <span className="chatProfile">
                  <span>
                    <img src={tempProfile.avatar && require("../assets/avatars/" + tempProfile.avatar + ".png")} alt="Logo" width="15" />
                    &nbsp;
                  </span>
                  <span>{tempProfile.user}</span>
                </span>
                <span className="msgContainer">{currentData.message}</span>
              </div>
              {currentData.user !== nextUser ? <div className="chatTime user">{calcTime(currentData.timestamp)}</div> : null}
            </div>
          )}
        </>
      );
    });
  };

  useEffect(() => {
    if (windowSize.width < 850) {
      document.getElementById("rightSidepanelMobile").style.height = "0em";
      document.getElementById("rightSidepanelMobile").style.width = "99.2%";
      document.getElementById("rightSidepanelMobile").style.hidden = false;
    } else {
      document.getElementById("rightSidepanel").style.width = "0em";
      document.getElementById("rightSidepanel").style.height = "100%";
      document.getElementById("rightSidepanel").style.hidden = false;
    }
  }, [window.innerWidth]);

  function toggleMenu() {
    if (windowSize.width < 850) {
      if (refElem.current.clientHeight === 0) {
        document.getElementById("rightSidepanelMobile").style.height = "30em";
        document.getElementById("rightSidepanelMobile").style.width = "99.2%";
      } else {
        document.getElementById("rightSidepanelMobile").style.height = "0em";
        document.getElementById("rightSidepanelMobile").style.width = "99.2%";
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
    if (document.getElementById("chatMessages")) {
      var elem = document.getElementById("chatMessages");
      elem.scrollTop = elem.scrollHeight;
    }
  }

  // if user clicks enter, it sends chat. If shift+enter, does not send (next line)
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && event.shiftKey === false) {
      send(event);
    }
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
            <textarea
              id="textarea"
              className="chatinput"
              type="textarea"
              name="message"
              placeholder="Your Message Here"
              wrap="hard"
              value={message}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
            <button className="chatSend" onClick={send}>
              Send
            </button>
          </div>
        </div>
      </>
    );
  };

  const displayChatroomMobile = () => {
    return (
      <>
        <div className="chatTitleMobile">Chatroom</div>
        <div className="chatContainerMobile">
          <div id="chatMessages" className="chatMessages">
            {displayChats()}
          </div>
          <div className="chatbarMobile">
            <textarea
              id="textarea"
              className="chatinput"
              type="textarea"
              name="message"
              placeholder="Your Message Here"
              wrap="hard"
              value={message}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />{" "}
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
          {windowSize.width > 850 ? (
            <>
              <div id="rightSidepanel" className="chatroom" ref={refElem}>
                <>{displayChatroom()}</>
              </div>
              <Button id="openbtn2" variant="info" onClick={toggleMenu}>
                <img src={require("../assets/chat.png")} alt="Chat" width="40" />
              </Button>
            </>
          ) : (
            <>
              <Button id="openbtn2" variant="info" onClick={toggleMenu}>
                <img src={require("../assets/chat.png")} alt="Chat" width="40" />
              </Button>
              <div id="rightSidepanelMobile" className="chatroomMobile" ref={refElem}>
                <div className="displayChatroomMobile">{displayChatroomMobile()}</div>
              </div>
            </>
          )}
        </div>
      </React.Fragment>
    );
  };

  const unauthenticatedChat = () => {
    return (
      <React.Fragment>
        <div className="chat">
          {windowSize.width < 850 ? (
            <>
              <Button id="openbtn2" variant="info" onClick={toggleMenu}>
                <img src={require("../assets/chat.png")} alt="Chat" width="40" />
              </Button>
              <div id="rightSidepanelMobile" className="chatroomMobile" ref={refElem}>
                <div className="notLoggedIn">Must be logged in to chat</div>
              </div>
            </>
          ) : (
            <>
              <div id="rightSidepanel" className="chatroom" ref={refElem}>
                <div className="notLoggedIn">Must be logged in to chat</div>
              </div>
              <Button id="openbtn2" variant="info" onClick={toggleMenu}>
                <img src={require("../assets/chat.png")} alt="Chat" width="40" />
              </Button>
            </>
          )}
        </div>
      </React.Fragment>
    );
  };

  return <React.Fragment>{!isAuthenticated ? unauthenticatedChat() : authenticatedChat()}</React.Fragment>;
};

export default Chat;
