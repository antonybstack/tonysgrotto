import React from "react";
import "./App.css";
import { TicketProvider } from "./contexts/TicketContext";
import TicketDisplay from "./displays/TicketDisplay";
import AddBacklog from "./changeData/AddBacklog";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <TicketProvider>
      <Router>
        <div className="App">
          <Link to="/" className="navbar-brand">
            MERN-Stack Bug Tracker App
          </Link>
          <AddBacklog />
          <Route path="/" exact component={TicketDisplay} />
          {/* <Route path="/edit/:id" component={EditTicket} /> */}
          {/* <Route path="/create" component={AddBacklog} /> */}
        </div>
      </Router>
    </TicketProvider>
  );
}

export default App;
