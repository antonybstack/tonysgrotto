import React, { useState, createContext } from "react";

export const SprintContext = createContext();

export const SprintProvider = (props) => {
  const [tickets, setTickets] = useState([
    {
      name: "Navigation Bar",
    },
    {
      name: "GitHub Link",
    },
  ]);
  return <SprintContext.Provider value={[tickets, setTickets]}>{props.children}</SprintContext.Provider>;
};
