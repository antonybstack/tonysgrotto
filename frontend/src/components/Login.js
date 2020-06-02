import React, { useState, useContext, useEffect, useRef } from "react";
import Message from "../components/Message";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { Form, Button, Overlay, Tooltip, Spinner } from "react-bootstrap";

const Login = (props) => {
  console.log("Login");
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const [authLoaded, setAuthLoaded] = useState(false);
  const authContext = useContext(AuthContext);
  const [clicked, setClicked] = useState(false);
  const [show, setShow] = useState(false);
  const [typeError, setErrorType] = useState("");
  const target = useRef(null);
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  // const clk = async () => {
  //   setClicked(true);
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (clicked === true) {
      axios
        .post("/api/users/login", user)
        .then((res) => {
          const { isAuthenticated, user } = res.data;
          if (isAuthenticated) {
            setMessage({ msgBody: "Account successfully logged in", msgError: false });
            setErrorType("loginSuccessMessage");
            setShow(true);
            setTimeout(function () {
              authContext.setUser(user);
              authContext.setIsAuthenticated(isAuthenticated);
              setClicked(false);

              props.action();
            }, 1500);
          }
        })
        .catch(function (error) {
          console.log(error);
          setErrorType("loginErrorMessage");
          setShow(true);
          setClicked(false);
          setMessage({ msgBody: "Invalid username or password", msgError: true });
        });
    }
  };

  const onSubmitDemo = (e) => {
    console.log("clicked", clicked);
    e.preventDefault();
    let userDemo = { username: "demo", password: "demo" };
    axios.post("/api/users/login", userDemo).then((res) => {
      const { isAuthenticated, user } = res.data;
      if (isAuthenticated) {
        setMessage({ msgBody: "Account successfully logged in", msgError: false });
        setErrorType("loginSuccessMessage");
        setShow(true);
        setTimeout(function () {
          authContext.setUser(user);
          authContext.setIsAuthenticated(isAuthenticated);
          setClicked(false);

          props.action();
        }, 1500);
      }
      // const { isAuthenticated, user } = res.data;
      // authContext.setUser(user);
      // authContext.setIsAuthenticated(isAuthenticated);
      // props.action();
      // setMessage({ msgBody: "Account successfully logged in", msgError: false });
    });
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" onChange={onChange} />
        </Form.Group>
        <Button
          ref={target}
          variant="primary"
          type="submit"
          onClick={() => {
            setClicked(true);
          }}
        >
          Submit
        </Button>
        <Form onSubmit={onSubmitDemo} className="demo">
          <Button variant="warning" type="submit">
            Demo
          </Button>
        </Form>
        {/* {message ? <Message message={message} /> : null} */}
      </Form>
      <Overlay delay={{ show: 50, hide: 50 }} target={target.current} show={show} placement="right-end">
        {(props) => (
          <Tooltip id={typeError} {...props}>
            {console.log(message)}
            <Message message={message} />
          </Tooltip>
          //    <Tooltip id={message.msgError === true ? "loginErrorMessage" : "loginSuccessMessage"} {...props}>
          //    <Message message={message} />
          //  </Tooltip>
        )}
      </Overlay>

      {/* {message ? <Message message={message} /> : null} */}
    </>
  );
};

export default Login;
