import React from "react";
import { useContext, useState } from "react";
import { SprintContext } from "../contexts/SprintContext";

const SprintDisplay = () => {
  const [tickets, setTickets] = useContext(SprintContext);
  console.log(tickets);
  return (
    <div className="sprint">
      <h1>Sprint</h1>
      <div>
        {tickets.map((ticket) => (
          <li>{ticket.name}</li>
        ))}
      </div>
    </div>
  );
};

export default SprintDisplay;
