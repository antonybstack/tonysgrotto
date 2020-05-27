import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//purpose of this context is to hold the information of an individual user that is logged in on the website

export const AuthContext = createContext();

export default ({ children }) => {
  const [user, setUser] = useState(null); // user that is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false); // for checking if this logged in user is authenticated or not
  const [isLoaded, setIsLoaded] = useState(false); // see if the authentication is loaded

  useEffect(() => {
    axios
      .get("/api/users/authenticated")
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(res.data.isAuthenticated);
        setTimeout(() => {
          setIsLoaded(true);
        }, 100);
      })
      .catch(function (error) {
        setUser({ username: "", role: "" });
        setIsAuthenticated(false);
        setTimeout(() => {
          setIsLoaded(true);
        }, 100);

        console.log(error);
      });
  }, []);

  // providing user and isAuthenticated variables to be global variables
  return (
    <div>
      {!isLoaded ? (
        <div className="test">
          <img className="loading" src={require("../assets/loading.gif")} alt="loading..." />
        </div>
      ) : (
        <div className="test">
          <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>{children}</AuthContext.Provider>
        </div>
      )}
    </div>
  );
};
