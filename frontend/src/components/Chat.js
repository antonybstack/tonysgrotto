import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ProfileContext } from "../contexts/ProfileContext";
import { ChatContext } from "../contexts/ChatContext";
import { SocketContext } from "../contexts/SocketContext";
import Message from "../components/Message";
import axios from "axios";
import moment from "moment-timezone";

const Chat = (props) => {
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState(null);
  const { user, isAuthenticated } = useContext(AuthContext);
  const { chats, setChats } = useContext(ChatContext);
  const { profiles } = useContext(ProfileContext);
  const { socket } = useContext(SocketContext);
  console.log("Chat");
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
        console.log(temp);
        // temp.forEach((currentData) => {
        //   setChats((currentChats) => [...currentChats, currentData]);
        // });
      });
    };
    await updateBeforeClear();

    console.log(temp);
    temp.forEach((t) => {
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
        {errMessage ? <Message message={errMessage} /> : null}
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
