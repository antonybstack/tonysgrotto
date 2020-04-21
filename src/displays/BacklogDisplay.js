import React from "react";
import { useContext, useState } from "react";
import { BacklogContext } from "../contexts/BacklogContext";

const BacklogDisplay = () => {
  const [tickets, setTickets] = useContext(BacklogContext);
  console.log(tickets);
  return (
    <div className="backlog">
      <h1>Backlog</h1>
      <div>
        {tickets.map((ticket) => (
          <li>{ticket.name}</li>
        ))}
      </div>
    </div>
  );
};

export default BacklogDisplay;
