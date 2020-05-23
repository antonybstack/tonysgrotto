import React, { useState, createContext, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import * as io from "socket.io-client";

//Context provides a way to pass data through the component tree without having to pass props down manually at every level.

// createContext function returns a Provider and a Consumer component (i.e. TicketContext.Provider & TicketContext.Consumer)
export const SocketContext = createContext(); //creating Context object with empty object

export default ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [socketLoaded, setSocketLoaded] = useState(false);
  const [socket, setSocket] = useState([]);
  useEffect(() => {
    //connect to socket io
    //window.location.hostname is for heroku deploy
    // const createSocket = async () => {
    //   var hostname = "http://localhost:5000";
    //   if (window.location.hostname.toString() != "localhost") {
    //     hostname = window.location.hostname;
    //   }
    //   setSocket(io.connect(hostname));
    // };
    const createSocket = async () => {
      var hostname = "http://localhost:5000";
      if (window.location.hostname.toString() != "localhost") {
        hostname = window.location.hostname;
      }
      const tempSocket = io.connect(hostname);
      setSocket(tempSocket);
    };

    const loaded = async () => {
      const response = await createSocket();
      setTimeout(async () => {
        setSocketLoaded(true);
        console.log(socket);
      }, 100);
    };
    loaded();

    //create user object to send
    // const createUser = async () => {
    //   const response = await createSocket();
    //   console.log(socket);
    //   if (isAuthenticated) {
    //     const newUser = {
    //       username: user.username,
    //       userid: user._id,
    //       avatar: user.avatar,
    //     };
    //     console.log(newUser);
    //     setTimeout(() => {
    //       socket.emit("new user", newUser);
    //     }, 100);
    //   } else {
    //     //   socket.emit("disconnect");
    //   }
    //   setTimeout(() => {
    //     setSocketLoaded(true);
    //   }, 100);
    // };
    // createUser();
  }, []);

  return (
    <div>
      {!socketLoaded ? (
        <div className="test">
          <img className="loading" src={require("../assets/loading.gif")} alt="loading..." />
        </div>
      ) : (
        <div className="test">
          <SocketContext.Provider value={{ socket, setSocket }}>{children}</SocketContext.Provider>
          {/* <img className="loading" src={require("../assets/loading.gif")} alt="loading..." /> */}
        </div>
      )}
    </div>
  );
};
