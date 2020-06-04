import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { SocketContext } from "../contexts/SocketContext";
import { UsersOnlineContext } from "../contexts/UsersOnlineContext";
import Login from "./Login";
import Register from "./Register";
import * as io from "socket.io-client";
import axios from "axios";
import { Navbar, NavDropdown, Nav, Modal, Button } from "react-bootstrap";

const Navbarr = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
  const { socket, setSocket } = useContext(SocketContext);
  const { usersOnline } = useContext(UsersOnlineContext);
  const [loginShow, setLoginShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);

  console.log("Navbar");

  const loginHandler = () => {
    setLoginShow(false);
  };
  const registerHandler = () => {
    setRegisterShow(false);
    setLoginShow(true);
  };

  function LoginModal(props) {
    // let prop = props;
    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered dialogClassName="modal-50w">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login value={props} action={loginHandler} />
        </Modal.Body>
        <Modal.Footer>
          {/* <DeleteTicket value={prop} action={editTicketHandler} /> */}
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function RegisterModal(props) {
    // let prop = props;
    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered dialogClassName="modal-50w">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Register value={props} action={registerHandler} />
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
            {/* <Link to="/">
              <li className="nav-item nav-link">Home</li>
            </Link> */}
            <NavDropdown smooth={true} duration={500} title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item smooth={true} duration={500}>
                <div data-dismiss="OverlayTrigger" onClick={() => setLoginShow(true)}>
                  Login
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item smooth={true} duration={500}>
                <div data-dismiss="OverlayTrigger" onClick={() => setRegisterShow(true)}>
                  Register
                </div>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="https://github.com/antonybstack/tonysgrotto" target="_blank">
              <img src={require("../assets/github.png")} alt="github" width="100" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <LoginModal show={loginShow} onHide={() => setLoginShow(false)} />
        <RegisterModal show={registerShow} onHide={() => setRegisterShow(false)} />
      </Navbar>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">tonysgrotto</Navbar.Brand>
        <Navbar.Text className="navProfile">
          &nbsp;&nbsp;&nbsp;
          <img src={user.avatar && require("../assets/avatars/" + user.avatar + ".png")} alt="Logo" width="20" /> {user.username}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Navbar.Text>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* <Link to="/">
              <li className="nav-item nav-link">Home</li>
            </Link> */}
            <NavDropdown title="Account">
              {user.role === "admin" ? (
                <>
                  <NavDropdown.Item>
                    <Link to="/admin" className="navLink">
                      Admin
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </>
              ) : null}
              <NavDropdown.Item onClick={onClickLogoutHandler} smooth="true" duration={500}>
                <div data-dismiss="OverlayTrigger">Logout</div>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="https://github.com/antonybstack/tonysgrotto" target="_blank">
              <img src={require("../assets/github.png")} alt="github" width="100" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };
  return <>{!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}</>;
};

export default Navbarr;
