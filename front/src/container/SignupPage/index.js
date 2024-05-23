// 1 Файл SignupPage
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { registerUser } from "../../AuthActions";

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleSignup = async (event) => {
    event.preventDefault();
    const confirmationCode = Math.random().toString(36).substring(2, 12);

    const registrationResult = registerUser(email, password, confirmationCode);

    if (registrationResult.success) {
      dispatch({
        type: "LOGIN",
        payload: { token: "temporary_token", user: registrationResult.user },
      });
      alert(
        `Реєстрація пройшла успішно. Ваш код підтвердження: ${confirmationCode}`
      );
      navigate("/signup-confirm");
    } else {
      alert(registrationResult.message);
    }
  };

  return (
    <div className="default-container">
      <h1>Реєстрація</h1>
      <form onSubmit={handleSignup}>
        <div className="input_field-container">
          <input
            className="input_field"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введіть email"
            required
          />
          <input
            className="input_field"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Створіть пароль"
            required
          />
        </div>
        <button type="submit" className="continue-button">
          Зареєструватися
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
