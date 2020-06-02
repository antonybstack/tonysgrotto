import React from "react";
import "./App.css";
import TicketProvider from "./contexts/TicketContext";
import ProfileProvider from "./contexts/ProfileContext";
import AuthProvider from "./contexts/AuthContext";
import SocketProvider from "./contexts/SocketContext";
import ChatProvider from "./contexts/ChatContext";
import UsersOnlineProvider from "./contexts/UsersOnlineContext";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Admin from "./components/Admin";
import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnPrivateRoute";
import TicketDisplay from "./components/TicketDisplay";
import NavBarr from "./components/NavBar";

import UsersOnline from "./components/UsersOnline";
import { BrowserRouter as Router, Route } from "react-router-dom";

// App is a component that acts as a container for all other components
function App() {
  console.log("App");
  return (
    <div className="App">
      <AuthProvider>
        <SocketProvider>
          {/* // Every Context object comes with a Provider component which consumes all nested components
      consumed components to subscribe to context changes. */}
          <ProfileProvider>
            <TicketProvider>
              <ChatProvider>
                <UsersOnlineProvider>
                  {/* We will wrap <Router /> in <Provider /> so that route handlers can get access to the store. */}
                  {/* so that when the URL changes, <Router /> will match a branch of its routes, and render their configured components */}
                  <Router>
                    {/*  links text to route */}
                    <NavBarr />
                    <UnPrivateRoute path="/login" component={Login} />
                    <UnPrivateRoute path="/register" component={Register} />
                    <PrivateRoute path="/admin" roles={["admin"]} component={Admin} />
                    <Route path="/" exact component={Home} />
                  </Router>
                </UsersOnlineProvider>
              </ChatProvider>
            </TicketProvider>
          </ProfileProvider>
        </SocketProvider>
      </AuthProvider>
    </div>
  );
}

export default App; //export one component
