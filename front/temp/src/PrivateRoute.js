// Файл PrivateRoute
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const PrivateRoute = ({
  children,
  allowUnconfirmed = false,
  needsConfirmation = false,
}) => {
  const { token, user } = useContext(AuthContext);

  // Дозволяє доступ до компоненту, навіть якщо користувач ще не підтверджений
  if (!token && !allowUnconfirmed) {
    return <Navigate to="/signin" />;
  }

  // Check if a new sign-up needs account confirmation
  // if (needsConfirmation && !user?.isConfirmed) {
  //   return <Navigate to="/signup-confirm" />;
  // }

  // User has token and does not require further confirmation
  return children;
};

export default PrivateRoute;
