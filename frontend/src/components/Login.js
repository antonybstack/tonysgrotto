import React, { useState, useContext } from "react";
import Auth from "../services/Auth";
import Message from "../components/Message";
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";
import axios from "axios";
import * as io from "socket.io-client";

const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);
  const { chats, setChats } = useContext(ChatContext);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/users/login", user)
      .then((res) => {
        console.log(res);
        const { isAuthenticated, user } = res.data;
        if (isAuthenticated) {
          authContext.setUser(user);
          authContext.setIsAuthenticated(isAuthenticated);
          setMessage({ msgBody: "Account successfully logged in", msgError: false });
          // props.history.push("/");
        }
        // else {
        //   setChats([]);
        // }
      })
      .catch(function (error) {
        console.log(message);
        setMessage({ msgBody: "Invalid username or password", msgError: true });
        console.log(error.response);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.statusText);
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Please sign in</h3>
        <label htmlFor="username" className="sr-only">
          Username:{" "}
        </label>
        <input type="text" name="username" onChange={onChange} className="form-control" placeholder="Enter Username" />
        <label htmlFor="password" className="sr-only">
          Password:{" "}
        </label>
        <input type="password" name="password" onChange={onChange} className="form-control" placeholder="Enter Password" />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Log in{" "}
        </button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Login;
