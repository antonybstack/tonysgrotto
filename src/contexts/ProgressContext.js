import React, { useState, createContext } from "react";

export const ProgressContext = createContext();

export const ProgressProvider = (props) => {
  const [tickets, setTickets] = useState([
    {
      name: "bug tracker",
    },
  ]);
  return <ProgressContext.Provider value={[tickets, setTickets]}>{props.children}</ProgressContext.Provider>;
};
