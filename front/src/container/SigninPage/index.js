// 1 Файл SigninPage.js
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { usersDatabase } from "../../AuthActions";

export const SigninPage = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [error, setError] = useState("");

  const handleSignin = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    const user = usersDatabase.find((user) => user.email === email.value);

    if (!user) {
      setError("Користувач з такою електронною адресою не знайдений.");
      return;
    }

    if (user.password !== password.value) {
      setError("Невірний пароль.");
      return;
    }

    dispatch({
      type: "LOGIN",
      payload: { token: "some_token", user: user },
    });

    dispatch({
      type: "ADD_EVENT",
      payload: {
        title: "Вхід в акаунт",
        info: `Вхід в акаунт користувача ${
          user.email
        } о ${new Date().toLocaleString()}`,
      },
    });

    if (!user.confirmed) {
      setError(
        "Ваш аккаунт не підтверджений. Будь ласка, перевірте ваш email."
      );
      return;
    }

    navigate("/balance");
  };

  const handleForgotPassword = () => {
    console.log("Користувач вибрав відновлення пароля.");
    navigate("/recovery");
  };

  return (
    <div className="default-container">
      <button onClick={() => navigate(-1)} className="nav_back-button">
        Назад
      </button>
      <h1>Вхід в акаунт</h1>
      <form onSubmit={handleSignin}>
        <div className="input_field-container">
          <input
            className="input_field"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className="input_field"
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button
          type="button"
          onClick={handleForgotPassword}
          className="forgot-password-link"
        >
          Забули пароль? Відновити
        </button>
        <button type="submit" className="continue-button">
          Увійти
        </button>
        <p>
          <a href="/delete-account" className="settings-button">
            Видалити акаунт
          </a>
        </p>
      </form>
    </div>
  );
};

export default SigninPage;
