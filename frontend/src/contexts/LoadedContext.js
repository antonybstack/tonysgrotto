import React, { useContext, createContext, useState, useEffect } from "react";
import { TicketContext } from "./TicketContext";
import { ProfileContext } from "./ProfileContext";
// import { AuthContext } from "./AuthContext";

export const LoadedContext = createContext();

export default ({ children }) => {
  const [appLoaded, setAppLoaded] = useState(false); // see if the app is loaded
  //   const [authLoaded, setAuthLoaded] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [ticketLoaded, setTicketLoaded] = useState(false);

  const [profiles, setProfiles] = useContext(ProfileContext);
  const [tickets, setTickets] = useContext(TicketContext);
  //   const auth = useContext(AuthContext);

  //   console.log(auth);
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

  //   console.log(useContext(ProfileContext)[0].length);
  //   if (useContext(ProfileContext)[0].length !== 0) {
  //     setProfileLoaded(true);
  //     console.log("its true now!");
  //   }

  // providing user and isAuthenticated variables to be global variables
  //   return <LoadedContext.Provider value={[appLoaded]}>{children}</LoadedContext.Provider>;
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
