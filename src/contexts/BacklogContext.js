import React, { useState, createContext } from "react";

export const BacklogContext = createContext();

export const BacklogProvider = (props) => {
  const [tickets, setTickets] = useState([
    {
      name: "conceptualize billions of dollars app",
    },
    {
      name: "GPA Calculator",
    },
    {
      name: "Authentication/Authorization",
    },
    {
      name: "real-time chat channel",
    },
    {
      name: "dark mode/light mode",
    },
    {
      name: "users online feature",
    },
    {
      name: "implement Golang, rethinkDB",
    },
    {
      name: "upload pictures gallery",
    },
    {
      name: "randomized uploaded image slideshow",
    },
    {
      name: "overwatch hero counters",
    },
    {
      name: "video game APIs",
    },
    {
      name: "twitch api",
    },
    {
      name: "reddit api",
    },
    {
      name: "runescape font css",
    },
    {
      name: "visual represntations of react concepts",
    },
    {
      name: "corona virus API",
    },
  ]);
  return <BacklogContext.Provider value={[tickets, setTickets]}>{props.children}</BacklogContext.Provider>;
};
