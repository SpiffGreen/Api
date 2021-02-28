import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";

import {
  // IS_AUTHENTICATED,
  SET_AUTHENTICATED,
} from "../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    // loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set Auth
  const setAuth = n => {
    dispatch({
      type: SET_AUTHENTICATED,
      payload: { value: n }
    });
  };

  return <AuthContext.Provider
          value={{
            isAuthenticated: state.isAuthenticated,
            setAuth,
          }}>
            {props.children}
          </AuthContext.Provider>
}

export default AuthState;