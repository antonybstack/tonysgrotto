import React, { useState, useContext, useEffect } from "react";
import Message from "../components/Message";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const Login = (props) => {
  console.log("Login");
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const [authLoaded, setAuthLoaded] = useState(false);
  const authContext = useContext(AuthContext);

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
          props.action();
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
    axios.post("/api/users/login", userDemo).then((res) => {
      const { isAuthenticated, user } = res.data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        setMessage({ msgBody: "Account successfully logged in", msgError: false });
        props.action();
      }
    });
  };

  return (
    /* <form onSubmit={onSubmit}>
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
    </div> */
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" name="password" onChange={onChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Form onSubmit={onSubmitDemo} className="demo">
          <Button variant="warning" type="submit">
            Demo
          </Button>
        </Form>
        {/* {message ? <Message message={message} /> : null} */}
      </Form>

      {message ? <Message message={message} /> : null}
    </>
  );
};

export default Login;
