import React from "react";
import { useContext, useState } from "react";
import { TicketContext } from "../contexts/TicketContext";
import uuid from "uuid/v1";

const ChangeStatus = (ticket) => {
  const [tickets, setTickets] = useContext(TicketContext);
  console.log(ticket.value);

  const handleClick = (e) => {
    setTickets((currentTickets) => [...currentTickets, { name: ticket.value, status: "backlog", id: uuid() }]);
  };

  return <button onClick={handleClick}>click me</button>;
};

export default ChangeStatus;
