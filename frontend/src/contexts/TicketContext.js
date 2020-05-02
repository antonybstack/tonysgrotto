import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const TicketContext = createContext();

export const TicketProvider = (props) => {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    if (tickets.length) return; // so, we call just once
    getTickets();
  }, []);

  const getTickets = async () => {
    const response = await axios.get("http://localhost:4000/tickets/");
    setTickets(response.data);
  };
  return <TicketContext.Provider value={[tickets, setTickets]}>{props.children}</TicketContext.Provider>;
};
