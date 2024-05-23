// 1 Файл AuthRoute
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const AuthRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (token) {
    return <Navigate to="/balance" />;
  }

  return children;
};

export default AuthRoute;
