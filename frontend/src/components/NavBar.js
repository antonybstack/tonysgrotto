import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { SocketContext } from "../contexts/SocketContext";
import { UsersOnlineContext } from "../contexts/UsersOnlineContext";
import * as io from "socket.io-client";
import axios from "axios";

const Navbar = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
  const { socket, setSocket } = useContext(SocketContext);
  const { usersOnline } = useContext(UsersOnlineContext);

  const onClickLogoutHandler = async () => {
    socket.emit("get connections");

    for (var i = 0; i < usersOnline.length; i++) {
      if (usersOnline[i].socketid === socket.id) {
        usersOnline.splice(i, 1);
      }
    }

    socket.disconnect();

    await axios
      .get("/api/users/logout")
      .then((res) => {
        console.log("Logged out!", res);
        if (res.data.success) {
          setUser(res.data.user);
          setIsAuthenticated(false);
        }
      })
      .catch(function (error) {
        console.log("Logged out failed", error);
      });

    var hostname = "http://localhost:5000";
    if (window.location.hostname.toString() !== "localhost") {
      hostname = window.location.hostname;
    }
    const tempSocket = io.connect(hostname);
    setSocket(tempSocket);
  };

  const unauthenticatedNavBar = () => {
    return (
      <>
        <Link to="/">
          <li className="nav-item nav-link">Home</li>
        </Link>
        <Link to="/login">
          <li className="nav-item nav-link">Login</li>
        </Link>
        <Link to="/register">
          <li className="nav-item nav-link">Register</li>
        </Link>
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <Link to="/">
          <li className="nav-item nav-link">Home</li>
        </Link>
        {/* <Link to="/todos">
          <li className="nav-item nav-link">Todos</li>
        </Link> */}
        {user.role === "admin" ? (
          <Link to="/admin">
            <li className="nav-item nav-link">Admin</li>
          </Link>
        ) : null}
        <button type="button" className="btn btn-link nav-item nav-link" onClick={onClickLogoutHandler}>
          Logout
        </button>
        <div>
          <p>
            Welcome &lt;
            <img src={user.avatar && require("../assets/avatars/" + user.avatar + ".png")} alt="Logo" width="20" /> {user.username}&gt;
          </p>
        </div>
      </>
    );
  };
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/">
          <div className="navbar-brand">MERN-Stack Bug Tracker App</div>
        </Link>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">{!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}</ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
