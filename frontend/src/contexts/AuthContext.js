import React, { createContext, useState, useEffect } from "react";
import Auth from "../services/Auth";

export const AuthContext = createContext();

export default ({ children }) => {
  const [user, setUser] = useState(null); // user that is logged in
  const [profile, setProfile] = useState(null); // all user information
  const [isAuthenticated, setIsAuthenticated] = useState(false); // for checking if this logged in user is authenticated or not
  const [isLoaded, setIsLoaded] = useState(false); // see if the app is loaded

  useEffect(() => {
    Auth.getUser().then((data) => {
      console.log(data);
      setProfile(data);
    });
    Auth.isAuthenticated().then((data) => {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    });
  }, []);

  // providing user and isAuthenticated variables to be global variables
  return <div>{!isLoaded ? <h1>Loading</h1> : <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, profile }}>{children}</AuthContext.Provider>}</div>;
};
