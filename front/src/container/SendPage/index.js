// 1 Файл SendPage
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { generateTransactionId } from "../../AuthActions";

export const SendPage = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { user, dispatch } = useContext(AuthContext); // Отримання доступу до контексту автентифікації
  const navigate = useNavigate(); // Отримання доступу до хуки useNavigate

  const handleSend = async (event) => {
    event.preventDefault();
    if (isSending) return;
    setIsSending(true);
    // Припустимо, що користувач доступний у контексті
    dispatch({
      type: "ADD_TRANSACTION", // Дія для додавання транзакції
      payload: {
        id: generateTransactionId(), // Генерація унікального ідентифікатора для транзакції
        amount: amount,
        userIcon: user.icon, // Припускається, що зображення користувача доступне в контексті
        userName: user.name, // Припускається, що ім'я користувача доступне в контексті
        time: new Date().toISOString(),
        type: "send", // Тип транзакції: Отримання
      },
    });
    navigate("/balance"); // Переход на сторінку /balance після створення транзакції
    setIsSending(false);
    // Останній код у цій функції
  };

  return (
    <div className="default-container">
      <h1>Відправити кошти</h1>
      <form onSubmit={handleSend}>
        <div className="input_field-container">
          <input
            className="input_field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email одержувача"
            required
          />
          <input
            className="input_field"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Сума"
            required
          />
        </div>
        <button type="submit" className="continue-button">
          Відправити
        </button>
      </form>
    </div>
  );
};

export default SendPage;
