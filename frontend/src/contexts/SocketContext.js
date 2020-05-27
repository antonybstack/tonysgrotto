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
      const tempSocket = io.connect(hostname);
      setSocket(tempSocket);
    };

    const loaded = async () => {
      await createSocket();
      setTimeout(async () => {
        setSocketLoaded(true);
      }, 100);
    };
    loaded();
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
        </div>
      )}
    </div>
  );
};
