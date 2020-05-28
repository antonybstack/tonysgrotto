import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//purpose of this context is to hold the information of an individual user that is logged in on the website

export const AuthContext = createContext();

export default ({ children }) => {
  const [user, setUser] = useState(null); // user that is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false); // for checking if this logged in user is authenticated or not
  const [authLoaded, setAuthLoaded] = useState(false); // see if the authentication is loaded

  useEffect(() => {
    const getAuth = async () => {
      await axios
        .get("/api/users/authenticated")
        .then((res) => {
          setUser(res.data.user);
          setIsAuthenticated(res.data.isAuthenticated);
        })
        .catch(() => {
          setUser({ username: "", role: "" });
          setIsAuthenticated(false);
        });
    };

    const load = async () => {
      await getAuth();
      setAuthLoaded(true);
    };

    load();
  }, []);

  // providing user and isAuthenticated variables to be global variables
  return (
    <div>
      {!authLoaded ? (
        <div className="test">
          {console.log("auth not loaded")}
          <img className="loading" src={require("../assets/loading.gif")} alt="loading..." />
        </div>
      ) : (
        <div className="test">
          {console.log("auth loaded")}
          <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>{children}</AuthContext.Provider>
        </div>
      )}
    </div>
  );
};
