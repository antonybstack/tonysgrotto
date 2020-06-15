import React, { useState, useRef, useEffect } from "react";
import Message from "../components/Message";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const Register = (props) => {
  const [user, setUser] = useState({ username: "", password: "", role: "user" });
  const [message, setMessage] = useState(null);
  const [redirectMessage, setRedirectMessage] = useState("");
  let timerID = useRef(null);

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
    var i = 5;
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
    axios
      .post("/api/users/register", user)
      .then((res) => {
        const { message } = res.data;
        setMessage(message);
        resetForm();
        redirectCounter();
      })
      .catch((error) => {
        const { message } = error.response.data;
        setMessage(message);
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
          <Form.Control type="text" name="password" onChange={onChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {/* {message ? <Message message={message} /> : null} */}
      </Form>

      {message ? (
        <React.Fragment>
          <Message message={message} />
          <div style={{ fontStyle: "italic" }}>{redirectMessage}</div>
        </React.Fragment>
      ) : null}
    </>
  );
};

export default Register;
