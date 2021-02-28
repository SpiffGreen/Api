import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { 
    isAuthenticated, 
    // setAuth
  } = authContext;
  return <Route { ...rest} render={props => !isAuthenticated ? (
    <Redirect to="/signin" />
  ) : (
    <Component {...props} />
  )} />
};

export default PrivateRoute;
