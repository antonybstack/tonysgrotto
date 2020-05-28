import React, { useState, createContext, useContext, useEffect } from "react";
import { SocketContext } from "../contexts/SocketContext";

// Context provides a way to pass data through the component tree without having to pass props down manually at every level.

// createContext function returns a Provider and a Consumer component (i.e. TicketContext.Provider & TicketContext.Consumer)
export const UsersOnlineContext = createContext(); //creating Context object with empty object

export default ({ children }) => {
  const { socket } = useContext(SocketContext);
  const [usersOnline, setUsersOnline] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const getConnections = async () => {
      await socket.emit("get connections", "test");
      socket.on("get connections", (data) => {
        setUsersOnline(data);
      });
    };
    const loaded = async () => {
      await getConnections();
      setLoaded(true);
    };
    loaded();

    socket.on("disconnect", (connections) => {
      if (Array.isArray(connections)) {
        setUsersOnline(connections);
      }
    });
    socket.on("authenticated user", (data) => {
      setUsersOnline(data);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", (connections) => {
      if (Array.isArray(connections)) {
        setUsersOnline(connections);
      }
    });
    socket.on("authenticated user", (data) => {
      setUsersOnline(data);
    });
  }, []);

  return (
    <React.Fragment>
      {!loaded ? (
        <React.Fragment>
          {console.log("usersOnline not loaded")}
          <img className="loading" src={require("../assets/loading.gif")} alt="loading..." />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {console.log("usersOnline loaded")}
          <UsersOnlineContext.Provider value={{ usersOnline, setUsersOnline }}>{children}</UsersOnlineContext.Provider>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
