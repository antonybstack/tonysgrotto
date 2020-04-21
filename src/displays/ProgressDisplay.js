import React from "react";
import { useContext, useState } from "react";
import { ProgressContext } from "../contexts/ProgressContext";

const ProgressDisplay = () => {
  const [tickets, setTickets] = useContext(ProgressContext);
  console.log(tickets);
  return (
    <div className="progress">
      <h1>Progress</h1>
      <div>
        {tickets.map((ticket) => (
          <li>{ticket.name}</li>
        ))}
      </div>
    </div>
  );
};

export default ProgressDisplay;
