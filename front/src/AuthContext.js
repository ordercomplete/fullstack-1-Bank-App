import React, { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

const initialState = {
  token: null,
  user: null,
  isLoggedIn: false,
  transactions: [],
  users: [],
  events: [], // Додано нове поле для зберігання подій
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const loginEvent = {
        title: "Вхід в акаунт",
        info: `Вхід в акаунт користувача ${
          action.payload.user.email
        } о ${new Date().toLocaleString()}`,
      };
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isLoggedIn: true,
        events: [...(state.events || []), loginEvent],
      };
    case "LOGOUT":
      const logoutEvent = {
        title: "Вихід з акаунту",
        info: `Вихід з акаунту користувача ${
          state.user.email
        } о ${new Date().toLocaleString()}`,
      };
      return {
        ...initialState,
        events: [...(state.events || []), logoutEvent], // Ініціалізація події при виході
      };
    case "LOAD_USERS":
      return {
        ...state,
        users: action.payload.users,
      };
    case "REGISTER_USER":
      const newUser = action.payload.user;
      const newUsersList = [...state.users, newUser];
      return {
        ...state,
        users: newUsersList,
      };
    case "ADD_TRANSACTION":
      const updatedTransactions = [...state.transactions, action.payload];
      return {
        ...state,
        transactions: updatedTransactions,
      };
    case "ADD_EVENT": // Додавання нових подій до історії
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case "UPDATE_USER":
      const updatedUser = action.payload.user;
      return {
        ...state,
        user: updatedUser,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const localData = localStorage.getItem("authState");
    return localData ? JSON.parse(localData) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(state));
  }, [state]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
