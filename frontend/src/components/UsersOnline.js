import React, { Component } from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ProfileContext } from "../contexts/ProfileContext";
import { ChatContext } from "../contexts/ChatContext";
import { SocketContext } from "../contexts/SocketContext";
import axios from "axios";
import * as io from "socket.io-client";

const UsersOnline = () => {
  const [message, setMessage] = useState("");
  const { user, isAuthenticated } = useContext(AuthContext);
  const { chats, setChats } = useContext(ChatContext);
  const { profiles, setProfiles, profLoaded } = useContext(ProfileContext);
  const { socket } = useContext(SocketContext);
  const [usersOnline, setUsersOnline] = useState([]);

  useEffect(() => {
    socket.emit("get connections", "test");
    socket.on("get connections", (data) => {
      console.log("connections!");
      console.log(data);
      setUsersOnline(data);
    });
    socket.on("disconnect", (data) => {
      console.log("someone disconnected!");
      console.log(Array.isArray(data));
      console.log(data);
      if (Array.isArray(data)) {
        setUsersOnline(data);
      }
    });
    // if (isAuthenticated) {
    //   socket.on("new user", (data) => {
    //     console.log("here!");
    //     console.log(data);
    //     setUsersOnline((currentUsers) => [...currentUsers, data]);
    //   });
    // socket.on("get users", (data) => {
    //   console.log("here!");
    //   console.log(data);
    //   setUsersOnline(data);
    // });
    // }
  }, []);
  console.log(usersOnline);
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

  const displayUsersOnline = () => {
    let tempProfile;
    console.log(usersOnline);
    return usersOnline.map((currentUser, i) => {
      if (currentUser.userid !== "0") {
        tempProfile = findProfile(currentUser.userid);
      } else {
        tempProfile = {
          user: currentUser.username,
          avatar: currentUser.avatar,
        };
      }

      return (
        <React.Fragment>
          <div className="onlineUser">
            <span>
              <img src={tempProfile.avatar && require("../assets/avatars/" + tempProfile.avatar + ".png")} alt="Logo" width="15" />
              &nbsp;
            </span>
            <span>{tempProfile.user}&nbsp;</span>
          </div>
        </React.Fragment>
      );
    });
  };

  return <React.Fragment>{displayUsersOnline()}</React.Fragment>;
};

export default UsersOnline;
