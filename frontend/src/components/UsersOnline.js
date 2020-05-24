import React, { Component } from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ProfileContext } from "../contexts/ProfileContext";
import { ChatContext } from "../contexts/ChatContext";
import { SocketContext } from "../contexts/SocketContext";
import { UsersOnlineContext } from "../contexts/UsersOnlineContext";
import axios from "axios";
import moment from "moment";
import moment_timezone from "moment-timezone";
import * as io from "socket.io-client";

const UsersOnline = () => {
  const [message, setMessage] = useState("");
  const { user, isAuthenticated } = useContext(AuthContext);
  const { chats, setChats } = useContext(ChatContext);
  const { profiles, setProfiles, profLoaded } = useContext(ProfileContext);
  const { socket } = useContext(SocketContext);
  const { usersOnline, setUsersOnline } = useContext(UsersOnlineContext);
  const [timeStamps, setTimeStamps] = useState([]);

  const calcTime = (socketTimestamp) => {
    console.log("socketTimestamp: ", socketTimestamp);

    const socketSeconds = Number(socketTimestamp.seconds + socketTimestamp.minutes * 60 + socketTimestamp.hour * 3600);

    let date = moment().tz("America/New_York");
    let newDate = {
      seconds: date.seconds(),
      minutes: date.minutes(),
      hour: date.hours(),
      day: date.date(),
      month: date.month() + 1,
      year: date.year(),
    };
    console.log("currentTime: ", newDate);

    const currentSeconds = Number(newDate.seconds + newDate.minutes * 60 + newDate.hour * 3600);
    // console.log(socketSeconds);
    // console.log(currentSeconds);
    const secondsAgo = currentSeconds - socketSeconds;
    // console.log(secondsAgo);
    return Number(secondsAgo);
  };

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    // console.log(usersOnline);
    let timestamps = [];
    usersOnline.map((currentUser, i) => {
      let secondsAgo = calcTime(currentUser.timestamp);
      // console.log(Number(secondsAgo));
      let timestamp = {
        socketid: currentUser.socketid,
        time: secondsAgo,
      };
      timestamps.push(timestamp);
    });
    setTimeStamps(timestamps);
  }, 1000);

  // console.log(timeStamps);

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
    // console.log(usersOnline);
    return usersOnline.map((currentUser, i) => {
      console.log(currentUser);
      if (currentUser.userid !== "0") {
        let profileWithoutTime = findProfile(currentUser.userid);
        tempProfile = {
          user: profileWithoutTime.user,
          avatar: profileWithoutTime.avatar,
          timestamp: currentUser.timestamp,
        };
      } else {
        tempProfile = {
          user: currentUser.username,
          avatar: currentUser.avatar,
          timestamp: currentUser.timestamp,
        };
      }

      const formatTime = (seconds) => {
        // console.log(seconds);
        if (seconds >= 60 && seconds < 120) {
          return "1 minute";
        } else if (seconds >= 3600 && seconds < 7200) {
          return "1 hour";
        } else if (seconds > 60 && seconds < 3600) {
          return Math.floor(seconds / 60) + " minutes";
        } else if (seconds >= 7200) {
          return Math.floor(seconds / 3600) + " hrs";
        } else {
          return seconds + "s";
        }
      };

      return (
        <React.Fragment>
          <div>
            <span>
              <img src={tempProfile.avatar && require("../assets/avatars/" + tempProfile.avatar + ".png")} alt="Logo" width="15" />
              &nbsp;
            </span>
            <span>{tempProfile.user}&nbsp;</span>
            <span className="loginTime">logged in {formatTime(calcTime(tempProfile.timestamp))} ago.</span>
            {/* <span>
              {tempProfile.timestamp.hour % 12}:{tempProfile.timestamp.minutes} which was {calcTime(tempProfile.timestamp)}s ago.
            </span> */}
          </div>
        </React.Fragment>
      );
    });
  };

  return (
    <React.Fragment>
      <div className="usersOnline">
        <h5>Users Currently Online:</h5>
        {displayUsersOnline()}
      </div>
    </React.Fragment>
  );
};

export default UsersOnline;
