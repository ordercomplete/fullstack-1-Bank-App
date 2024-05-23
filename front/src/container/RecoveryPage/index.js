// 1 Файл RecoveryPage
import React from "react";
import { useNavigate } from "react-router-dom";
import { usersDatabase } from "../../AuthActions";

export const RecoveryPage = () => {
  const navigate = useNavigate([]);

  const generateRecoveryCode = () => {
    // Припустимо, що код складається з 6 цифр
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleRecovery = (event) => {
    event.preventDefault();
    const { email } = event.target.elements;
    const code = generateRecoveryCode();

    const userIndex = usersDatabase.findIndex(
      (user) => user.email === email.value
    ); // Визначення індексу користувача

    if (userIndex === -1) {
      alert("Користувач не знайдений");
      return;
    }
    console.log(
      "Обраний для відновлення користувач:",
      usersDatabase[userIndex]
    );

    alert(
      `Код відновлення відправлено на ваш Email: ${email.value} Ваш код: ${code}`
    );

    navigate("/recovery-confirm", {
      state: { email: email.value, code: code },
    });
  };

  return (
    <div className="default-container">
      <button onClick={() => navigate(-1)} className="nav_back-button">
        Назад
      </button>
      <h1>Відновлення акаунту</h1>
      <form onSubmit={handleRecovery}>
        <div className="input_field-container">
          <input
            className="input_field"
            name="email"
            placeholder="Ваш Email"
            required
          />
        </div>
        <button type="submit" className="continue-button">
          Відправити код
        </button>
      </form>
    </div>
  );
};

export default RecoveryPage;
