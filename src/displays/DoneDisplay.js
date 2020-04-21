import React from "react";
import { useContext, useState } from "react";
import { DoneContext } from "../contexts/DoneContext";

const DoneDisplay = () => {
  const [tickets, setTickets] = useContext(DoneContext);
  console.log(tickets);
  return (
    <div className="done">
      <h1>Done</h1>
      <div>
        {tickets.map((ticket) => (
          <li>{ticket.name}</li>
        ))}
      </div>
    </div>
  );
};

export default DoneDisplay;
