import React, {
  useState,
  createContext
} from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
  });
  return (
    <AuthContext.Provider value = {{
      isAuthenticated: auth,
      setAuth
    }} >
      {props.children}
    </AuthContext.Provider>
  );
}