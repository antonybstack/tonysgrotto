import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

// Context provides a way to pass data through the component tree without having to pass props down manually at every level.

// createContext function returns a Provider and a Consumer component (i.e. TicketContext.Provider & TicketContext.Consumer)
export const TicketContext = createContext(); //creating Context object with empty object

export default ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [tickLoaded, setTickLoaded] = useState(false);
  useEffect(() => {
    // populates tickets array. Send HTTP request to server
    const getTickets = async () => {
      const response = await axios.get("/api/tickets");
      setTickets(response.data);
      setTickLoaded(true);
    };
    getTickets();
  }, []);
  // provider passes context to all children compoents, no matter how deep it is
  return (
    <div>
      {!tickLoaded ? (
        <img className="loading" src={require("../assets/loading.gif")} alt="loading..." />
      ) : (
        <TicketContext.Provider value={{ tickets, setTickets, tickLoaded }}>{children}</TicketContext.Provider>
      )}
    </div>
  );
};
