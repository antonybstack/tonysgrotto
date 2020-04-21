import React, { useState, createContext } from "react";

export const DoneContext = createContext();

export const DoneProvider = (props) => {
  const [tickets, setTickets] = useState([
    {
      name: "React App initialized",
    },
  ]);
  return <DoneContext.Provider value={[tickets, setTickets]}>{props.children}</DoneContext.Provider>;
};
