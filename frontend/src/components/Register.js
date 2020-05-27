import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/Auth";
import Message from "../components/Message";
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
    console.log("exe");
    var i = 5;
    const check = () => {
      if (i === 0) {
        console.log("exe1");
        props.history.push("/login");
      } else {
        console.log(i);
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
        console.log(res.data);
        const { message } = res.data;
        setMessage(message);
        resetForm();
        redirectCounter();
      })
      .catch((error) => {
        console.log(error.response.data);
        const { message } = error.response.data;
        setMessage(message);
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Please Register</h3>
        <label htmlFor="username" className="sr-only">
          Username:&nbsp;
        </label>
        <input type="text" name="username" value={user.username} onChange={onChange} className="form-control" placeholder="Enter Username" />
        <label htmlFor="password" className="sr-only">
          Password:&nbsp;
        </label>
        <input type="password" name="password" value={user.password} onChange={onChange} className="form-control" placeholder="Enter Password" />

        <button type="submit">Register</button>
      </form>
      {message ? (
        <React.Fragment>
          <Message message={message} />
          <div style={{ fontStyle: "italic" }}>{redirectMessage}</div>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default Register;
