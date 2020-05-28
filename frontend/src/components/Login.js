import React, { useState, useContext, useEffect } from "react";
import Message from "../components/Message";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const [authLoaded, setAuthLoaded] = useState(false);
  const authContext = useContext(AuthContext);

  console.log("Login");

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/users/login", user)
      .then((res) => {
        const { isAuthenticated, user } = res.data;
        if (isAuthenticated) {
          authContext.setUser(user);
          authContext.setIsAuthenticated(isAuthenticated);
          setMessage({ msgBody: "Account successfully logged in", msgError: false });
        }
      })
      .catch(function (error) {
        console.log(error);
        setMessage({ msgBody: "Invalid username or password", msgError: true });
      });
  };

  const onSubmitDemo = (e) => {
    e.preventDefault();
    let userDemo = { username: "demo", password: "demo" };
    axios
      .post("/api/users/login", userDemo)
      .then((res) => {
        const { isAuthenticated, user } = res.data;
        if (isAuthenticated) {
          authContext.setUser(user);
          authContext.setIsAuthenticated(isAuthenticated);
          setMessage({ msgBody: "Account successfully logged in", msgError: false });
        }
      })
      .catch(function (error) {
        console.log(error);
        setMessage({ msgBody: "Invalid username or password", msgError: true });
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Please sign in</h3>
        <label htmlFor="username" className="sr-only">
          Username:&nbsp;
        </label>
        <input type="text" name="username" onChange={onChange} className="form-control" placeholder="Enter Username" />
        <label htmlFor="password" className="sr-only">
          Password:&nbsp;
        </label>
        <input type="password" name="password" onChange={onChange} className="form-control" placeholder="Enter Password" />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Log in
        </button>
      </form>
      <form onSubmit={onSubmitDemo}>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          DEMO
        </button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Login;
