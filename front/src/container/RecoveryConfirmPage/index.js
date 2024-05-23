// 1 Файл RecoveryConfirmPage
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updatePassword } from "../../AuthActions";
import { usersDatabase } from "../../AuthActions";

export const RecoveryConfirmPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, code } = location.state; // Отримання даних зі сторінки RecoveryPage

  const userIndex = usersDatabase.findIndex(
    (user) => user.email === email.value
  ); // Визначення індексу користувача

  if (userIndex === -1) {
    alert("Користувач не знайдений");
    return;
  }
  console.log("Обраний для відновлення користувач:", usersDatabase[userIndex]);

  const handleRestore = (event) => {
    event.preventDefault();
    const { recoveryCode, newPassword } = event.target.elements;

    if (recoveryCode.value === code) {
      // Виклик методу для оновлення паролю
      const updateResponse = updatePassword(email, newPassword.value);

      if (updateResponse.success) {
        console.log(`Пароль для ${email} змінено.`);
        navigate("/signin"); // Змінено на /signin для нового входу
      } else {
        console.log(updateResponse.message); // Показати повідомлення помилки
      }
    } else {
      console.log("Неправильний код перевірки. Спробуйте знову.");
    }
  };

  return (
    <div className="default-container">
      <button onClick={() => navigate(-1)} className="nav_back-button">
        Назад
      </button>
      <h1>Підтвердження відновлення</h1>
      <form onSubmit={handleRestore}>
        <div className="input_field-container">
          <input
            className="input_field"
            name="recoveryCode"
            placeholder="Введіть код"
            required
          />
          <input
            className="input_field"
            name="newPassword"
            type="password"
            placeholder="Новий пароль"
            required
          />
        </div>
        <button type="submit" className="continue-button">
          Відновити пароль
        </button>
      </form>
    </div>
  );
};

export default RecoveryConfirmPage;
