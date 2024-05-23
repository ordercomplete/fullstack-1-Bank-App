// 1 Файл SettingsPage
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { usersDatabase } from "../../AuthActions";

export const SettingsPage = () => {
  const navigate = useNavigate(); // Хук для навігації
  const { dispatch, user } = useContext(AuthContext);

  const handleChangeEmail = (event) => {
    event.preventDefault();
    const { newEmail, password } = event.target.elements;

    const currentUser = usersDatabase.find(
      (user) => user.password === password.value
    );
    if (currentUser) {
      currentUser.email = newEmail.value;
      dispatch({ type: "UPDATE_USER", payload: { email: newEmail.value } });
      console.log("Email оновлено.");
    } else {
      console.log("Неправильний поточний пароль.");
    }
  };

  const handleChangePassword = (event) => {
    event.preventDefault();
    const { newPassword, password } = event.target.elements;

    const currentUser = usersDatabase.find(
      (user) => user.password === password.value
    );
    if (currentUser) {
      currentUser.password = newPassword.value;
      dispatch({
        type: "UPDATE_USER",
        payload: { password: newPassword.value },
      });
      console.log("Пароль оновлено.");
    } else {
      console.log("Неправильний поточний пароль.");
    }
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  if (user && user.email) {
    // Логіка, що використовує user.email
    console.log(`Поточний email користувача: ${user.email}`);
  }
  return (
    <div className="default-container">
      <button onClick={() => navigate(-1)} className="nav_back-button">
        Назад
      </button>
      <h1>Налаштування</h1>
      <form onSubmit={handleChangeEmail}>
        <div className="input_field-container">
          <input
            className="input_field"
            name="newEmail"
            placeholder="Новий email"
            required
          />
          <input
            className="input_field"
            name="password"
            type="password"
            placeholder="Поточний пароль"
            required
          />
          <button type="submit" className="settings-button">
            Зберегти Email
          </button>
        </div>
      </form>
      <form onSubmit={handleChangePassword}>
        <div className="input_field-container">
          <input
            className="input_field"
            name="password"
            type="password"
            placeholder="Старий пароль"
            required
          />
          <input
            className="input_field"
            name="newPassword"
            type="password"
            placeholder="Новий пароль"
            required
          />
          <button type="submit" className="settings-button">
            Зберегти пароль
          </button>
        </div>
      </form>
      <button onClick={handleLogout} className="settings-button">
        Вийти
      </button>
    </div>
  );
};
export default SettingsPage;

// 3 Файл SettingsPage
