import React, { useState, createContext, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ProfileContext } from "../contexts/ProfileContext";
import { ChatContext } from "../contexts/ChatContext";
import { SocketContext } from "../contexts/SocketContext";
import axios from "axios";
import * as io from "socket.io-client";

//Context provides a way to pass data through the component tree without having to pass props down manually at every level.

// createContext function returns a Provider and a Consumer component (i.e. TicketContext.Provider & TicketContext.Consumer)
export const UsersOnlineContext = createContext(); //creating Context object with empty object

export default ({ children }) => {
  const { socket } = useContext(SocketContext);
  const [usersOnline, setUsersOnline] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    socket.on("disconnect", (connections) => {
      console.log("someone disconnected!");
      console.log(Array.isArray(connections));
      console.log(connections);
      console.log(socket.id);
      if (Array.isArray(connections)) {
        setUsersOnline(connections);
      }
    });
    socket.on("authenticated user", (data) => {
      console.log("authenticated connection!");
      console.log(data);
      setUsersOnline(data);
    });
    socket.on("guest user", (data) => {
      console.log("guest connection!");
      console.log(data);
      setUsersOnline(data);
    });

    socket.emit("get connections", "test");
    socket.on("get connections", (data) => {
      console.log("connections!");
      console.log(data);
      setUsersOnline(data);
    });

    const getConnections = async () => {
      socket.emit("get connections", "test");
      socket.on("get connections", (data) => {
        console.log("connections!");
        console.log(data);
        setUsersOnline(data);
      });
    };

    const loaded = async () => {
      const response = await getConnections();
      setTimeout(async () => {
        setLoaded(true);
      }, 200);
    };
    loaded();

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
  }, [socket]);

  return (
    <React.Fragment>
      {!loaded ? (
        <img className="loading" src={require("../assets/loading.gif")} alt="loading..." />
      ) : (
        <UsersOnlineContext.Provider value={{ usersOnline, setUsersOnline }}>{children}</UsersOnlineContext.Provider>
      )}
    </React.Fragment>
  );
};
