import React, { useState, useRef, useEffect } from "react";
import Message from "../components/Message";
import { Form, Button, Overlay, Tooltip } from "react-bootstrap";
import axios from "axios";

const Register = (props) => {
  const [user, setUser] = useState({ username: "", password: "", role: "user" });
  const [message, setMessage] = useState(null);
  const [redirectMessage, setRedirectMessage] = useState("");
  const [typeError, setErrorType] = useState("");
  const target = useRef(null);
  let timerID = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({ username: "", password: "", role: "user" });
  };

  const redirectCounter = () => {
    var i = 4;
    const check = () => {
      if (i === 0) {
        props.action();
      } else {
        if (i === 5 || i === 2) {
          setRedirectMessage("You will be redirected to sign in " + i + " seconds.");
        } else if (i === 4 || i === 1) {
          setRedirectMessage("You will be redirected to sign in " + i + " seconds..");
        } else {
          setRedirectMessage("You will be redirected to sign in " + i + " seconds...");
        }
        i--;
        setTimeout(check, 1000); // check again in a second
      }
    };
    check();
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (user.username === "") {
      console.log(user.username);
      setMessage({ msgBody: "Username cannot be empty", msgError: true });
      setErrorType("errorMessage");
      setShow(true);
    } else if (user.password === "") {
      console.log(user.password);
      setMessage({ msgBody: "Password cannot be empty", msgError: true });
      setErrorType("errorMessage");
      setShow(true);
    } else if (user.username.length < 4) {
      console.log(user.username.length);
      setMessage({ msgBody: "Username cannot be less than 4 characters", msgError: true });
      setErrorType("errorMessage");
      setShow(true);
    } else if (user.password.length < 4) {
      console.log(user.password.length);
      setMessage({ msgBody: "Password cannot be less than 4 characters", msgError: true });
      setErrorType("errorMessage");
      setShow(true);
    } else {
      axios
        .post("/api/users/register", user)
        .then((res) => {
          setMessage({ msgBody: "Account successfully created", msgError: false });
          setErrorType("successMessage");
          setShow(true);
          resetForm();
          redirectCounter();
        })
        .catch((error) => {
          console.log(error);
          setMessage({ msgBody: "Username already taken", msgError: true });
          setErrorType("errorMessage");
          setShow(true);
        });
    }
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
          <Form.Control type="text" name="password" onChange={onChange} />
        </Form.Group>
        <Button ref={target} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Overlay delay={{ show: 50, hide: 50 }} target={target.current} show={show} placement="right-end">
        {(props) => (
          <Tooltip className={typeError} {...props}>
            <Message message={message} />
            <div style={{ fontStyle: "italic" }}>{redirectMessage}</div>
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};

export default Register;
