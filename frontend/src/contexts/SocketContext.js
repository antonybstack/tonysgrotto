import React, { useState, createContext, useEffect } from "react";
import * as io from "socket.io-client";

//Context provides a way to pass data through the component tree without having to pass props down manually at every level.

// createContext function returns a Provider and a Consumer component (i.e. TicketContext.Provider & TicketContext.Consumer)
export const SocketContext = createContext(); //creating Context object with empty object

export default ({ children }) => {
  const [socketLoaded, setSocketLoaded] = useState(false);
  const [socket, setSocket] = useState([]);

  useEffect(() => {
    const createSocket = async () => {
      var hostname = "http://localhost:5000";
      if (window.location.hostname.toString() !== "localhost") {
        hostname = window.location.hostname;
      }
      const tempSocket = await io.connect(hostname);
      setSocket(tempSocket);
    };

    const load = async () => {
      await createSocket();
      setSocketLoaded(true);
    };

    load();
  }, []);

  return (
    <>
      {!socketLoaded ? (
        <>
          {console.log("socket not loaded")}
          <img className="loading" src={require("../assets/loading.gif")} alt="loading..." />
        </>
      ) : (
        <>
          {console.log("socket loaded")}
          <SocketContext.Provider value={{ socket, setSocket }}>{children}</SocketContext.Provider>
        </>
      )}
    </>
  );
};
