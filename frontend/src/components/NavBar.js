import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/Auth";
import { AuthContext } from "../contexts/AuthContext";
import { SocketContext } from "../contexts/SocketContext";
import Chat from "./Chat";
import * as io from "socket.io-client";

const Navbar = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const onClickLogoutHandler = () => {
    socket.disconnect();
    console.log(socket);
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
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
