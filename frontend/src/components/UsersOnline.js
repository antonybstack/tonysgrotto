import React, { Component } from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ProfileContext } from "../contexts/ProfileContext";
import { ChatContext } from "../contexts/ChatContext";
import { SocketContext } from "../contexts/SocketContext";
import { UsersOnlineContext } from "../contexts/UsersOnlineContext";
import axios from "axios";
import * as io from "socket.io-client";

const UsersOnline = () => {
  const [message, setMessage] = useState("");
  const { user, isAuthenticated } = useContext(AuthContext);
  const { chats, setChats } = useContext(ChatContext);
  const { profiles, setProfiles, profLoaded } = useContext(ProfileContext);
  const { socket } = useContext(SocketContext);
  const { usersOnline, setUsersOnline } = useContext(UsersOnlineContext);

  useEffect(() => {}, []);
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
