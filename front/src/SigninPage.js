import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const SigninPage = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignin = (event) => {
    event.preventDefault();
    // Перевірка вхідних даних та отримання токена від сервера
    const userData = {
      token: "existingtoken234",
      user: { name: "Existing User", confirm: true },
    };
    dispatch({ type: "LOGIN", payload: userData });
    navigate(userData.user.confirm ? "/balance" : "/signup-confirm");
  };

  return (
    <form onSubmit={handleSignin}>
      <h1>Вхід в акаунт</h1>
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Пароль" required />
      <button type="submit">Увійти</button>
    </form>
  );
};
