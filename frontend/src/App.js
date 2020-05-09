import React from "react";
import "./App.css";
import { TicketProvider } from "./contexts/TicketContext";
import AuthProvider from "./contexts/AuthContext";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Home from "./components/Home";
// import Todos from "./components/Todos";
import Register from "./components/Register";
import Admin from "./components/Admin";
import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnPrivateRoute";
import TicketDisplay from "./displays/TicketDisplay";
import AddBacklog from "./changeData/AddBacklog";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// App is a component that acts as a container for all other components
function App() {
  console.log("App mounted");
  return (
    <AuthProvider>
      {/* // Every Context object comes with a Provider component which consumes all nested components
      consumed components to subscribe to context changes. */}
      <TicketProvider>
        {/* We will wrap <Router /> in <Provider /> so that route handlers can get access to the store. */}
        {/* so that when the URL changes, <Router /> will match a branch of its routes, and render their configured components */}
        <Router>
          <div className="App">
            {/*  links text to route */}
            <NavBar />
            <UnPrivateRoute path="/login" component={Login} />
            <UnPrivateRoute path="/register" component={Register} />
            {/* <PrivateRoute path="/todos" roles={["user", "admin"]} component={Todos} /> */}
            <PrivateRoute path="/admin" roles={["admin"]} component={Admin} />
            <AddBacklog />
            <Route path="/" exact component={TicketDisplay} />
            {/* <Route path="/edit/:id" component={EditTicket} /> */}
            {/* <Route path="/create" component={AddBacklog} /> */}
          </div>
        </Router>
      </TicketProvider>
    </AuthProvider>
  );
}

export default App; //export one component
