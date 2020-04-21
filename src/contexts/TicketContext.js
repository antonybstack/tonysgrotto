import React, { useState, createContext } from "react";

export const TicketContext = createContext();

export const TicketProvider = (props) => {
  const [tickets, setTickets] = useState([
    {
      name: "conceptualize billions of dollars app",
      status: "backlog",
      id: 1,
    },
    {
      name: "GPA Calculator",
      status: "backlog",
      id: 2,
    },
    {
      name: "Authentication/Authorization",
      status: "backlog",
      id: 3,
    },
    {
      name: "real-time chat channel",
      status: "backlog",
      id: 4,
    },
    {
      name: "dark mode/light mode",
      status: "backlog",
      id: 5,
    },
    {
      name: "users online feature",
      status: "backlog",
      id: 6,
    },
    {
      name: "implement Golang, rethinkDB",
      status: "backlog",
      id: 7,
    },
    {
      name: "upload pictures gallery",
      status: "backlog",
      id: 8,
    },
    {
      name: "randomized uploaded image slideshow",
      status: "backlog",
      id: 9,
    },
    {
      name: "overwatch hero counters",
      status: "backlog",
      id: 10,
    },
    {
      name: "video game APIs",
      status: "backlog",
      id: 11,
    },
    {
      name: "twitch api",
      status: "backlog",
      id: 12,
    },
    {
      name: "reddit api",
      status: "backlog",
      id: 13,
    },
    {
      name: "runescape font css",
      status: "backlog",
      id: 14,
    },
    {
      name: "visual represntations of react concepts",
      status: "backlog",
      id: 15,
    },
    {
      name: "corona virus API",
      status: "backlog",
      id: 16,
    },
    {
      name: "ski highlights",
      status: "backlog",
      id: 17,
    },
    {
      name: "Navigation Bar",
      status: "sprint",
      id: 18,
    },
    {
      name: "GitHub Link",
      status: "sprint",
      id: 19,
    },
    {
      name: "bug tracker",
      status: "progress",
      id: 20,
    },
    {
      name: "React App initialized",
      status: "done",
      id: 21,
    },
  ]);
  return <TicketContext.Provider value={[tickets, setTickets]}>{props.children}</TicketContext.Provider>;
};
