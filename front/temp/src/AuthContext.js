// Файл AuthContext Date 13.06.24 version-2
import React, { createContext, useReducer, useEffect } from "react";
import {
  handleAddTransaction,
  handleConfirmTransactionStatus,
} from "./component/transactions";

export const AuthContext = createContext();

const initialState = {
  token: null,
  user: null,
  isLoggedIn: false,
  users: [...(JSON.parse(localStorage.getItem("users")) || [])],
  transactions: JSON.parse(localStorage.getItem("transactions")) || [],
  events: [],
};

const loadStateFromLocalStorage = () => {
  const defaultState = {
    token: null,
    user: null,
    isLoggedIn: false,
    users: [...(JSON.parse(localStorage.getItem("users")) || [])], // Initialize with admin account //add 20.06.24-00:27
    transactions: [],
    events: [],
    pendingTransactions: [], // add 17.06.24-22:44
  };

  try {
    const storedState = JSON.parse(localStorage.getItem("authState")) || {};
    const storedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];

    // return {//remove 15.06.24-20:30
    //   ...defaultState,
    //   ...storedState,
    //   transactions: storedTransactions,
    // };

    const loadedState = {
      //add 15.06.24-20:30
      ...defaultState,
      ...storedState,
      transactions: storedTransactions,
      pendingTransactions: storedState.pendingTransactions || [], // add 17.06.24-22:44
    };

    // Only add the admin account if not already present//add 20.06.24-00:27
    // if (!loadedState.users.find((user) => user.email === adminAccount.email)) {
    //   loadedState.users.push(adminAccount);
    // }

    console.log("Loaded state from localStorage:", loadedState); // Logging loaded state
    return loadedState;
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    // return defaultState;
  }
  return initialState;
};

const saveStateToLocalStorage = (state) => {
  try {
    localStorage.setItem(
      "authState",
      JSON.stringify({
        token: state.token,
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        users: state.users,
        events: state.events,
        pendingTransactions: state.pendingTransactions, // add 17.06.24-22:44
      })
    );
    localStorage.setItem("transactions", JSON.stringify(state.transactions));
    console.log("State saved to localStorage:", state);
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};

// const saveStateOnChange = (state) => {
//   saveStateToLocalStorage(state);
// };

// initialState = loadStateFromLocalStorage();
export const reducer = (state, action) => {
  let newState;

  console.log("Current State:", state); // Log current state before action
  console.log("Action Received:", action); // Log received action

  switch (action.type) {
    case "LOGIN":
      const loginEvent = {
        title: "Вхід в акаунт",
        info: `Вхід користувача ${
          action.payload.user.email
        } о ${new Date().toLocaleString()}`,
        time: new Date(),
        user: action.payload.user.email, // Added user email to event add 21.06.24-11:15
      };
      newState = {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isLoggedIn: true,
        events: [...state.events, loginEvent],
      };
      break;

    case "LOGOUT":
      const logoutEvent = {
        title: "Вихід з акаунту",
        info: `Вихід користувача ${
          state.user ? state.user.email : ""
        } о ${new Date().toLocaleString()}`,
        time: new Date(),
        user: state.user ? state.user.email : "", // Added user email to event add 21.06.24-11:15
      };
      newState = {
        ...initialState,
        users: state.users,
        transactions: state.transactions,
        pendingTransactions: state.pendingTransactions, // add 17.06.24-22:44
        events: [...state.events, logoutEvent],
      };
      console.log("Action LOGOUT:", action, "New State:", newState);
      break;

    case "REGISTER_USER": //додано events
      const newUser = {
        // add const newUser 15.06.24-21:02
        title: "Реєстрація користувача",
        info: `Створений користувач ${
          action.payload.newUser.email
        } о ${new Date().toLocaleString()}`,
        time: new Date(),
        ...action.payload.newUser,
        confirmed: action.payload.newUser.confirmed || false,
        confirmationCode: action.payload.newUser.confirmationCode || "",
        user: action.payload.newUser.email, // Add user email to event 21.06.24-11:15
      };
      // const newUser = action.payload.user; remove 14.06.24-16:55
      newState = {
        ...state,
        users: [...state.users, action.payload.newUser], //update add action.payload. 21.06.24-11:15
        events: [...state.events, newUser],
      };
      console.log("Action REGISTER_USER:", action, "New State:", newState);
      break;

    case "REMOVE_USER": // Додано DATE-04.06.24.
      const removeEvent = {
        title: "Видалення акаунту",
        info: `Видалено користувача ${
          state.user ? state.user.email : ""
        } о ${new Date().toLocaleString()}`,
        time: new Date(),
        user: action.payload.email, // Add user email to event 21.06.24-12:19
      };
      newState = {
        ...state,
        users: state.users.filter(
          (user) => user.email !== action.payload.email
        ),
        events: [...state.events, removeEvent],
      };
      console.log("Action REMOVE_USER:", action, "New State:", newState);
      break;

    // case "REMOVE_USER": //add const adminAccount 20.06.24-00:59
    // Заважав видаленню запис if (state.user && state.user.isAdmin)
    //   if (state.user && state.user.isAdmin) {
    //     // const removeEvent = {
    //     //   title: "Account Deletion",
    //     //   info: `Admin deleted user ${
    //     //     action.payload.email
    //     //   } at ${new Date().toLocaleString()}`,
    //     //   time: new Date(),
    //     // };
    //     newState = {
    //       ...state,
    //       users: state.users.filter(
    //         (user) => user.email !== action.payload.email
    //       ),
    //       events: [...state.events], //delete "removeEvent"
    //     };
    //   } else {
    //     console.warn("Unauthorized account deletion attempt.");
    //     newState = state;
    //   }
    //   break;

    //case "LOAD_USERS" for UsersPage for what?
    // case "LOAD_USERS": //remove 14.06.24-16:59
    //   newState = {
    //     ...state,
    //     users: action.payload.users,
    //   };
    //   console.log("Action LOAD_USERS:", action, "New State:", newState);
    //   break;

    //==========
    //Add  case "UPDATE_USER_EMAIL" and case "UPDATE_USER_PASSWORD" instead of case "UPDATE_USER" 14.06.24-16:59
    //Треба при вдалій зміні пошти зробити вихід з акаунту на сторінку входу
    case "UPDATE_USER_EMAIL":
      const updateUserEmailEvent = {
        title: "Зміна пошти",
        info: `Змінено пошту користувача ${action.payload.oldEmail} на ${
          action.payload.newEmail
        } о ${new Date().toLocaleString()}`,
        time: new Date(),
        user: action.payload.oldEmail, // Add user email to event 21.06.24-12:19
      };
      newState = {
        ...state,
        users: state.users.map((user) =>
          user.email === action.payload.oldEmail
            ? { ...user, email: action.payload.newEmail }
            : user
        ),
        events: [...state.events, updateUserEmailEvent],
      };
      console.log("Action UPDATE_USER_EMAIL:", action, "New State:", newState); // Log action and new state
      break;

    //При зміні пароля створити алерт при вводі невірного старого пароля.
    case "UPDATE_USER_PASSWORD":
      const updateUserPasswordEvent = {
        title: "Зміна пароля",
        info: `Змінено пароль користувача ${action.payload.oldPassword} на ${
          action.payload.newPassword
        } о ${new Date().toLocaleString()}`,
        time: new Date(),
        user: action.payload.email, // Add user email to event 21.06.24-12:19
      };
      newState = {
        ...state,
        users: state.users.map((user) =>
          user.email === action.payload.email
            ? { ...user, password: action.payload.newPassword }
            : user
        ),
        events: [...state.events, updateUserPasswordEvent],
      };
      console.log(
        "Action UPDATE_USER_PASSWORD:",
        action,
        "New State:",
        newState
      ); // Log action and new state
      break;
    //==========

    case "CONFIRM_USER": //add 15.06.24-18:52
      newState = {
        ...state,
        users: state.users.map((user) =>
          user.email === action.payload.email
            ? { ...user, confirmed: true, confirmationCode: "" }
            : user
        ),
      };
      console.log("Action CONFIRM_USER:", action, "New State:", newState); // Log action and new state
      break;

    case "ADD_TRANSACTION":
      newState = handleAddTransaction(state, action); // Use the new handler
      break;

    case "CONFIRM_TRANSACTION":
      newState = handleConfirmTransactionStatus(state, action); // Use the new handler
      break;

    //============================
    // case "ADD_EVENT":
    //   newState = {
    //     ...state,
    //     events: [...state.events, action.payload],
    //   };
    //   console.log("Action ADD_EVENT:", action, "New State:", newState);
    //   break;

    //add case "CLEAR_TRANSACTIONS": DATE-12.06.24-22:37 version-1
    case "CLEAR_TRANSACTIONS":
      newState = {
        ...state,
        transactions: [],
        pendingTransactions: [],
      };
      console.log(
        "Action CLEAR_TRANSACTIONS: Cleared all transactions",
        newState
      ); // Log action and new state
      break;

    case "CLEAR_EVENTS": //change 15.06.24-18:56
      newState = {
        ...state,
        events: [],
        combinedEvents: [],
      };
      console.log(
        "Action CLEAR_EVENTS:",
        action,
        "Cleared all events",
        newState
      ); // Log action and new state
      break;

    // case "CLEAR_USERS": //change 15.06.24-18:56
    //   newState = {
    //     ...state,
    //     users: [],
    //   };
    //   console.log("Action CLEAR_USERS:", action, "Cleared all users", newState); // Log action and new state
    //   break;

    case "CLEAR_USERS":
      const adminUser = state.users.find((user) => user.isAdmin); // Ensure the admin user is retained
      newState = {
        ...state,
        users: adminUser ? [adminUser] : [], // Keeps the admin user if found otherwise an empty array
      };
      console.log(
        "Action CLEAR_USERS:",
        action,
        "Cleared all users except admin",
        newState
      );
      break;

    default:
      newState = state;
      console.log("Unhandled action type:", action);
  }
  // Save state changes to localStorage
  saveStateToLocalStorage(newState);
  // saveStateOnChange(newState);//remove 15.06.24-18:58
  console.log("New State after saving to localStorage:", newState); // Log new state after saving
  return newState;
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    loadStateFromLocalStorage
  );

  useEffect(() => {
    saveStateToLocalStorage(state);
    console.log("AuthProvider State: ", state); //change 15.06.24-19:00
  }, [state]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
