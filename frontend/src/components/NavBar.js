import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { SocketContext } from "../contexts/SocketContext";
import { UsersOnlineContext } from "../contexts/UsersOnlineContext";
import Login from "./Login";
import * as io from "socket.io-client";
import axios from "axios";
import { Navbar, NavDropdown, Nav, Modal, Button } from "react-bootstrap";

const Navbarr = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
  const { socket, setSocket } = useContext(SocketContext);
  const { usersOnline } = useContext(UsersOnlineContext);
  const [show, setShow] = useState(false);

  console.log("Navbar");

  const editTicketHandler = () => {
    setShow(false);
  };

  function MyVerticallyCenteredModal1(props) {
    // let prop = props;
    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered dialogClassName="modal-50w">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login value={props} action={editTicketHandler} />
        </Modal.Body>
        <Modal.Footer>
          {/* <DeleteTicket value={prop} action={editTicketHandler} /> */}
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

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
        if (res.data.success) {
          setUser(res.data.user);
          setIsAuthenticated(false);
        }
      })
      .catch(function (error) {
        console.log(error);
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
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">tonysgrotto</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/">
              <li className="nav-item nav-link">Home</li>
            </Link>
            <NavDropdown smooth={true} duration={500} title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item smooth={true} duration={500}>
                <div data-dismiss="OverlayTrigger" onClick={() => setShow(true)}>
                  Login
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/register">Register</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <MyVerticallyCenteredModal1 show={show} onHide={() => setShow(false)} />
      </Navbar>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">tonysgrotto</Navbar.Brand>
        <Navbar.Text>
          &nbsp;&nbsp;&nbsp;
          <img src={user.avatar && require("../assets/avatars/" + user.avatar + ".png")} alt="Logo" width="20" /> {user.username}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Navbar.Text>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/">
              <li className="nav-item nav-link">Home</li>
            </Link>
            <NavDropdown title="Account">
              {user.role === "admin" ? (
                <>
                  <NavDropdown.Item>
                    <Link to="/admin">Admin</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </>
              ) : null}
              <NavDropdown.Item onClick={onClickLogoutHandler}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };
  return <>{!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}</>;
};

export default Navbarr;
