// 1 Файл SignupConfirmPage
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { usersDatabase } from "../../AuthActions";

export const SignupConfirmPage = () => {
  const [confirmationCodeInput, setConfirmationCodeInput] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleConfirm = (event) => {
    event.preventDefault();
    const user = usersDatabase.find(
      (u) => u.confirmationCode === confirmationCodeInput && !u.confirmed
    );

    if (user) {
      user.confirmed = true;
      dispatch({ type: "LOGIN", payload: { token: "final_token", user } });
      alert("Код підтверджений. Ви ввійшли в систему.");
      navigate("/balance");
    } else {
      alert("Невірний код підтвердження або вже використаний.");
    }
  };

  return (
    <div className="default-container">
      <h1>Підтвердження Реєстрації</h1>
      <form onSubmit={handleConfirm}>
        <input
          type="text"
          name="confirmationCode"
          value={confirmationCodeInput}
          onChange={(e) => setConfirmationCodeInput(e.target.value)}
          placeholder="Введіть ваш код підтвердження"
          required
        />
        <button type="submit" className="continue-button">
          Підтвердити
        </button>
      </form>
    </div>
  );
};

export default SignupConfirmPage;
