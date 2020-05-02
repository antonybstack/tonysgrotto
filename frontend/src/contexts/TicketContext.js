import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const TicketContext = createContext();

export const TicketProvider = (props) => {
  console.log("context mounted");
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    if (tickets.length) return; // so, we call just once
    getTickets();
  }, []);

  const getTickets = async () => {
    const response = await axios.get("http://localhost:8080/tickets/");
    setTickets(response.data);
  };
  return <TicketContext.Provider value={[tickets, setTickets]}>{props.children}</TicketContext.Provider>;
};