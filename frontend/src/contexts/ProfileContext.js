import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

//Context provides a way to pass data through the component tree without having to pass props down manually at every level.

// createContext function returns a Provider and a Consumer component (i.e. TicketContext.Provider & TicketContext.Consumer)
export const ProfileContext = createContext(); //creating Context object with empty object

export const ProfileProvider = (props) => {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    // populates profiles array. Send HTTP request to server
    const getProfiles = async () => {
      const response = await axios.get("/api/users");
      setProfiles(response.data);
    };
    getProfiles();
  }, []);

  // provider passes context to all children compoents, no matter how deep it is
  return <ProfileContext.Provider value={[profiles, setProfiles]}>{props.children}</ProfileContext.Provider>;
};
