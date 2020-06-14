import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

//we dont want a not logged in user to access admin page, or a non-admin to access admin page

//all other props stored in rest
//Private Route is passed a component and roles in App.js
const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        //if user is not authenticated, they will be sent to login page
        if (!isAuthenticated) return <Redirect to={{ pathname: "/", state: { from: props.location } }} />;
        //if user does not have valid role, user will be sent to home page
        if (!roles.includes(user.role)) return <Redirect to={{ pathname: "/", state: { from: props.location } }} />;
        //if user is authenticated and has correct role, this.Component is returned
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
