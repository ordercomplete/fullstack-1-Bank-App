// Файл SettingsPage
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";
// import { NavigationLink } from "../../component/NavigationLink";
import PasswordInput from "../../component/PasswordInput";
import TitleComponent from "../../component/TitleComponent";
import UsersBlock from "../../component/UsersBlock";

export const SettingsPage = () => {
  const navigate = useNavigate();
  const { dispatch, user, users } = useContext(AuthContext);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  // Local state for managing input fields
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordForEmail, setPasswordForEmail] = useState("");
  const [passwordForPassword, setPasswordForPassword] = useState("");

  // Separate error states for each field
  const [newEmailError, setNewEmailError] = useState(false);
  const [passwordForEmailError, setPasswordForEmailError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [passwordForPasswordError, setPasswordForPasswordError] =
    useState(false);

  const handleChangeEmail = (event) => {
    event.preventDefault();
    const { newEmail, password } = event.target.elements;

    let isError = false;

    console.log("Поточний користувач:", user);
    console.log("Всі користувачі:", users);
    console.log("Введений новий email:", newEmail.value);

    setNewEmailError(false);
    setPasswordForEmailError(false);

    //Проблема може виникати через те, що стан users може містити користувача з поточним email, спричиняючи хибне проходження першої перевірки, оскільки друга перевірка виявляє співпадіння. Замість простих умов if, можна спробувати покращити логіку перевірки, аби обидві умови працювали коректно. Скористайтеся логікою раннього виходу (early return), яка дозволяє негайно вийти з функції, якщо умова true. Це допомагає уникнути зайвої обробки.

    if (user && user.password === passwordForEmail) {
      if (user.email === newEmail.value) {
        setEmailErrorMsg("Ви не можете змінити email на поточний");
        setNewEmailError(true);
        setNewEmail("");
        // isError = true;
        return;
      }
      if (users.find((u) => u.email === newEmail.value)) {
        setEmailErrorMsg("Цей email вже зареєстрований");
        setNewEmailError(true);
        setNewEmail("");
        // isError = true;
        return;
      }
      if (!isError) {
        dispatch({
          type: "UPDATE_USER_EMAIL",
          payload: { oldEmail: user.email, newEmail: newEmail.value },
        });
        console.log("Email оновлено.");
        setEmailErrorMsg("");
        setNewEmailError(false);
        setPasswordForEmailError(false);
        setNewEmail("");
        setPasswordForEmail("");
        // Prompt user to re-login
        if (
          window.confirm(
            "Email was successfully updated. Would you like to log out to apply changes?"
          )
        ) {
          handleLogout();
        }
      }
    } else {
      setPasswordForEmail("");
      setEmailErrorMsg("Невірний поточний пароль");
      setPasswordForEmailError(true);
      console.log("Невірний поточний пароль");
    }
  };

  const handleChangePassword = (event) => {
    event.preventDefault();
    if (user && user.password === passwordForPassword) {
      dispatch({
        type: "UPDATE_USER_PASSWORD",
        payload: { email: user.email, newPassword: newPassword },
      });
      console.log("Пароль оновлено.");
      setPasswordErrorMsg("");
      setNewPasswordError(false);
      setPasswordForPasswordError(false);
      setNewPassword("");
      setPasswordForPassword("");
      // Prompt user to re-login
      if (
        window.confirm(
          "Password was successfully updated. Would you like to log out to apply changes?"
        )
      ) {
        handleLogout();
      }
    } else {
      setPasswordForPassword("");
      setPasswordErrorMsg("Невірний поточний пароль");
      setPasswordForPasswordError(true);
      console.log("Невірний поточний пароль");
    }
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  if (user && user.email) {
    console.log(`Поточний email користувача: ${user.email}`);
  }

  //for title=================
  // Replace with actual authentication state
  // const isAuthenticated = true; //user.email знайти підтвердження авторизації від системи
  // Якщо у вас вже є змінна, що містить різні назви для сторінок
  const pageTitle = "Settings"; // Тут можна передати потрібний заголовок
  //for title=================

  return (
    <div className="default-container-auth jost-font-text">
      <div className="Status-Bar-Box">
        <img
          className="Status-Bar"
          src="svg/Status-Bar-Black.svg"
          alt="icon-enter"
        />
      </div>

      {/* title ідентичний для всіх сторінок */}
      <TitleComponent pageTitle={pageTitle} />
      <UsersBlock user={user} />
      {/* {user && user.isAdmin ? <UsersBlock user={user} /> : null} */}

      <form onSubmit={handleChangeEmail}>
        <div className="input_field-container">
          <label htmlFor="newEmail" className="input_label">
            Новий email
          </label>
          <input
            className={`input_field ${newEmailError ? "error" : ""}`}
            name="newEmail"
            type="email"
            placeholder={newEmailError ? emailErrorMsg : "Новий email"}
            value={newEmail}
            onChange={(e) => {
              setNewEmailError(false);
              setNewEmail(e.target.value);
            }}
            required
          />
          <label htmlFor="passwordForEmail" className="input_label">
            Поточний пароль
          </label>
          <PasswordInput
            className={`input_field ${passwordForEmailError ? "error" : ""}`}
            name="passwordForEmail"
            value={passwordForEmail}
            onChange={(e) => {
              setPasswordForEmailError(false);
              setPasswordForEmail(e.target.value);
            }}
            placeholder={
              passwordForEmailError ? emailErrorMsg : "Поточний пароль"
            }
            type="password"
          />
          <button type="submit" className="settings-button">
            Зберегти Email
          </button>
        </div>
      </form>

      <div className="button-container-divider"></div>

      <form onSubmit={handleChangePassword}>
        <div className="input_field-container">
          <label htmlFor="newPassword" className="input_label">
            Новий пароль
          </label>
          <PasswordInput
            className={`input_field ${newPasswordError ? "error" : ""}`}
            name="newPassword"
            value={newPassword}
            onChange={(e) => {
              setNewPasswordError(false);
              setNewPassword(e.target.value);
            }}
            placeholder={newPasswordError ? passwordErrorMsg : "Новий пароль"}
            type="password"
          />
          <label htmlFor="passwordForPassword" className="input_label">
            Поточний пароль
          </label>
          <PasswordInput
            className={`input_field ${passwordForPasswordError ? "error" : ""}`}
            name="passwordForPassword"
            value={passwordForPassword}
            onChange={(e) => {
              setPasswordForPasswordError(false);
              setPasswordForPassword(e.target.value);
            }}
            placeholder={
              passwordForPasswordError ? passwordErrorMsg : "Поточний пароль"
            }
            type="password"
          />
          <button type="submit" className="settings-button">
            Зберегти пароль
          </button>
        </div>
      </form>
      <div className="button-container-divider"></div>
      <div className="input_field-container">
        <Link to="/delete-account" className="delete-button">
          Видалити акаунт
        </Link>
        <button onClick={handleLogout} className="settings-button">
          Вийти
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
