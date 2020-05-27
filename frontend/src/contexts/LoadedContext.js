import React, { useContext, createContext, useState, useEffect } from "react";
import { TicketContext } from "./TicketContext";
import { ProfileContext } from "./ProfileContext";

export const LoadedContext = createContext();

export default ({ children }) => {
  const [appLoaded, setAppLoaded] = useState(false); // see if the app is loaded
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [ticketLoaded, setTicketLoaded] = useState(false);
  const { profiles } = useContext(ProfileContext);
  const { tickets } = useContext(TicketContext);

  useEffect(() => {
    if (profiles.length !== 0) {
      setProfileLoaded(true);
    }
    if (tickets.length !== 0) {
      setTicketLoaded(true);
    }
    console.log(ticketLoaded, profileLoaded);
    if (ticketLoaded === true && profileLoaded === true) {
      setAppLoaded(true);
    }
  }, [profiles.length, tickets.length]);

  return (
    <div>
      {ticketLoaded !== true || profileLoaded !== true ? (
        <img className="loading" src={require("../assets/loading.gif")} alt="loading..." />
      ) : (
        <LoadedContext.Provider value={{ appLoaded }}>{children}</LoadedContext.Provider>
      )}
    </div>
  );
};
