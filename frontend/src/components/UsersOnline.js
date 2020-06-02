import React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { UsersOnlineContext } from "../contexts/UsersOnlineContext";
import { Button, ListGroup, Fade } from "react-bootstrap";
import { useSpring, animated } from "react-spring";
import moment from "moment-timezone";

const UsersOnline = () => {
  const { usersOnline } = useContext(UsersOnlineContext);
  const [count, setCount] = useState(0);
  const spring = useSpring({ opacity: 1, from: { opacity: 0 } });

  // const [width, setWidth] = React.useState('100px')
  const refElem = useRef();

  console.log("UsersOnline");

  const calcTimeSinceLogin = (socketTimestamp) => {
    let date = moment().tz("America/New_York");
    const currentSeconds = moment(date).diff(moment().startOf("day"), "seconds");
    const socketSeconds = moment(socketTimestamp).diff(moment().startOf("day"), "seconds");
    const secondsAgo = currentSeconds - socketSeconds;
    return Number(secondsAgo);
  };
  const formatTime = (seconds) => {
    if (seconds >= 60 && seconds < 120) {
      return "1 min";
    } else if (seconds >= 3600 && seconds < 7200) {
      return "1 hr";
    } else if (seconds >= 86400 && seconds < 172800) {
      return Math.floor(seconds / 86400) + " day";
    } else if (seconds > 60 && seconds < 3600) {
      return Math.floor(seconds / 60) + " mins";
    } else if (seconds >= 7200 && seconds < 86400) {
      return Math.floor(seconds / 3600) + " hrs";
    } else if (seconds >= 172800) {
      return Math.floor(seconds / 86400) + " days";
    } else {
      return seconds + "s";
    }
  };

  useEffect(() => {
    setInterval(() => {
      setCount((prevTime) => prevTime + 1);
    }, 1000);
  }, []);

  function toggleMenu() {
    if (refElem.current.clientWidth === 0) {
      document.getElementById("leftSidepanel").style.width = "15em";
    } else {
      document.getElementById("leftSidepanel").style.width = "0em";
    }
  }

  const displayUsersOnline = () => {
    return usersOnline.map((currentUser, i) => {
      let thisUserTime = formatTime(calcTimeSinceLogin(currentUser.timestamp));

      return (
        <React.Fragment key={i}>
          <ListGroup.Item className="loggedUser">
            <span>
              <img src={currentUser.avatar && require("../assets/avatars/" + currentUser.avatar + ".png")} alt="Logo" width="15" />
              &nbsp;
            </span>
            <span>{currentUser.username}&nbsp;</span>
            <span className="loginTime">logged in {thisUserTime} ago.</span>
          </ListGroup.Item>
        </React.Fragment>
      );
    });
  };

  return (
    <React.Fragment>
      <div className="users">
        {/* <animated.div style={props}>I will fade in</animated.div> */}
        <Button id="openbtn" onClick={toggleMenu} variant="info">
          <span className="sideText">Users Online</span>
        </Button>

        <div id="leftSidepanel" className="usersOnline" ref={refElem}>
          {/* <h5>Users Currently Online:</h5> */}
          <ListGroup className="userlist">{displayUsersOnline()}</ListGroup>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UsersOnline;
