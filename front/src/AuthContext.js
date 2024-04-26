import React, { createContext, useReducer } from "react";

const initialState = {
  token: null,
  user: null,
  isLoggedIn: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isLoggedIn: true,
      };
    case "LOGOUT":
      return { ...initialState };
    default:
      return state;
  }
}

export const AuthContext = createContext();

// Змініть AuthProvider для створення змінної з контекстними даними
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const authContextData = { state, dispatch }; // Створіть об'єкт для передачі у Provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};
