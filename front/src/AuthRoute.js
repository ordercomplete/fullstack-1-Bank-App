import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const AuthRoute = ({ children }) => {
  const { state } = useContext(AuthContext); // Додайте state тут
  const { token } = state; // Отримайте token зі state
  return token ? children : <Navigate to="/signin" />;
};
