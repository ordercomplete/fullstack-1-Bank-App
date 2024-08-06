// 2 Файл SigninPage.js
import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
// import { NavigationLink } from "../../component/NavigationLink";
import TitleComponent from "../../component/TitleComponent";
import PasswordInput from "../../component/PasswordInput";

export const SigninPage = () => {
  const navigate = useNavigate();
  const { user, users, dispatch } = useContext(AuthContext); // Витягаємо список користувачів з контексту
  // const [error, setError] = useState("");

  const [passwordForEmailError, setPasswordForEmailError] = useState(false);
  const [passwordForEmail, setPasswordForEmail] = useState("");

  const [emailError, setEmailError] = useState("");

  const [email, setEmail] = useState("");
  const [newEmailError, setNewEmailError] = useState(false);

  const handleSignin = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    const user = users.find((user) => user.email === email.value);
    let isError = false;

    console.log("Поточний користувач:", user);
    console.log("Всі користувачі:", users);

    setPasswordForEmailError(false);
    setEmailError("");

    if (!user) {
      setNewEmailError(true);
      setEmailError("User not found");
      setEmail("");
      console.log("Signin Page: User not found", email.value);
      return;
    }

    if (user && user.password !== passwordForEmail) {
      setPasswordForEmail("");
      setEmailError("Incorrect password");
      setPasswordForEmailError(true);
      console.log("Signin Page: Incorrect password for", email.value);
      return;
    }

    if (!user.confirmed) {
      setEmailError("Account not confirmed");
      setNewEmailError(true);
      setEmail("");
      console.log("Signin Page: Account not confirmed for", email.value);
      return;
    }

    if (!isError) {
      dispatch({
        type: "LOGIN",
        payload: { token: "some_token", user: user },
      });

      console.log("Signin Page: User logged in", email.value);
      navigate("/balance");
    } else {
      setPasswordForEmail("");
      // setEmailErrorMsg("Невірний поточний пароль");
      setEmailError("Incorrect current password");
      setPasswordForEmailError(true);
      console.log("Невірний поточний пароль");
    }
    // }
  };

  // const handleForgotPassword = () => {
  //   console.log("User selected password recovery.");
  //   navigate("/recovery");
  // };

  //for title=================
  // Replace with actual authentication state
  // const isAuthenticated = true; //user.email знайти підтвердження авторизації від системи
  // Якщо у вас вже є змінна, що містить різні назви для сторінок
  const pageTitle = "Sign in"; // Тут можна передати потрібний заголовок
  //for title=================

  return (
    <div className="default-container">
      <TitleComponent pageTitle={pageTitle} />

      <h4 className="text-under-title">Select login method</h4>
      <form onSubmit={handleSignin}>
        <div className="input_field-container">
          {/* <label>Email</label> */}
          <label htmlFor="email" className="input_label">
            Email
          </label>
          {/* <input
            className="input_field"
            name="email"
            type="email"
            placeholder="Email"
            required
          /> */}
          <input
            className={`input_field ${newEmailError ? "error" : ""}`}
            name="email"
            type="email"
            placeholder={newEmailError ? emailError : "Email"}
            // placeholder="Email"
            // value={user}
            value={email || ""}
            onChange={(e) => {
              setNewEmailError(false);
              setEmail(e.target.value);
            }}
            required
          />
          {/* <label>
            {newEmailError && (
              <span className="error-message">{emailError}</span>
            )}
          </label> */}
          {/* <label>Password</label> */}
          <label htmlFor="passwordForEmail" className="input_label">
            Password
          </label>
          {/* <input
            className="input_field"
            name="password"
            type="password"
            placeholder="Password"
            required
          /> */}
          <PasswordInput
            className={`input_field ${passwordForEmailError ? "error" : ""}`}
            name="passwordForEmail"
            value={passwordForEmail}
            onChange={(e) => {
              setPasswordForEmailError(false);
              setPasswordForEmail(e.target.value);
            }}
            placeholder={passwordForEmailError ? emailError : "Password"}
            // placeholder="Current Password"
            type="password"
            required
          />
          {/* <label>
            {passwordForEmailError && (
              <span className="error-message">{emailError}</span>
            )}
          </label> */}
        </div>
        {/* {error && <p className="error-message">{error}</p>} */}
        <div className="button-container">
          <h4>
            Forgot your password? <Link to="/recovery">Restore</Link>
          </h4>
          <button type="submit" className="continue-button">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default SigninPage;
