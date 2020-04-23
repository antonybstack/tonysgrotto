import React from "react";
import "./App.css";
import { TicketProvider } from "./contexts/TicketContext";
import TicketDisplay from "./displays/TicketDisplay";
import AddBacklog from "./addData/AddBacklog";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EditTicket from "./addData/edit-ticket";

function App() {
  return (
    <Router>
      <TicketProvider>
        <div className="container">
          <Link to="/" className="navbar-brand">
            MERN-Stack Bug Tracker App
          </Link>
          <Link to="/" className="nav-link">
            Tickets
          </Link>
          <Link to="/create" className="nav-link">
            Create Todo
          </Link>
        </div>
      </TicketProvider>
      <Route path="/" exact component={TicketDisplay} />
      <Route path="/edit/:id" component={EditTicket} />
      <Route path="/create" component={AddBacklog} />
    </Router>
  );
}

export default App;
