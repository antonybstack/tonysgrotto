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

  const validate = () => {
    if (user.username.length < 4 || user.username.length > 20) {
      setMessage("Username must be between 4 and 20 characters long");
    } else if (user.password.length < 4 || user.password.length > 20) {
      setMessage("Password must be between 4 and 20 characters long");
    } else {
      setMessage("");
    }
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
        setRedirectMessage("You will be redirected to the login page in " + i + " seconds");
        i--;
        setTimeout(check, 1000); // check again in a second
      }
    };
    check();
    // for (i = 0; i < 5; i++) {
    //   setRedirectMessage("You will be redirected to the login page in" + i + " seconds")
    // }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    // if (user.username.length < 4 || user.username.length > 20) {
    //   setMessage("Username must be between 4 and 20 characters long");
    // }
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

  // const redirect = () => {
  //   props.history.push("/login");
  // }

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
