import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const SignupPage = () => {
  const { dispatch } = useContext(AuthContext);
  return (
    <div>
      <h1>Ласкаво просимо</h1>
      <button
        onClick={() =>
          dispatch({
            type: "LOGIN",
            payload: { user: "Username", token: "token1234" },
          })
        }
      >
        Увійти
      </button>
      <button onClick={() => dispatch({ type: "LOGOUT" })}>Вийти</button>
    </div>
  );
};
