import React, { createContext, useState, useEffect } from "react";
import Auth from "../services/Auth";
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
        setIsLoaded(true);
        // const { isAuthenticated, user } = res.data;
        // if (isAuthenticated) {
        //   authContext.setUser(user);
        //   authContext.setIsAuthenticated(isAuthenticated);
        //   props.history.push("/");
      })
      .catch(function (error) {
        setUser({ username: "", role: "" });
        setIsAuthenticated(false);
        setIsLoaded(true);
        console.log(error);
      });

    // return fetch("/api/users/authenticated").then((res) => {
    //   if (res.status !== 401) return res.json().then((data) => data);
    //   else return { isAuthenticated: false, user: { username: "", role: "" } };
    // });

    // Auth.isAuthenticated().then((data) => {
    //   setUser(data.user);
    //   setIsAuthenticated(data.isAuthenticated);
    //   setIsLoaded(true);
    // });
  }, []);

  // providing user and isAuthenticated variables to be global variables
  return (
    <div>
      {!isLoaded ? (
        <img className="loading" src={require("../assets/loading.gif")} alt="loading..." />
      ) : (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>{children}</AuthContext.Provider>
      )}
    </div>
  );
};
