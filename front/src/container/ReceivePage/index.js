// 1 Файл receivePage
import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { generateTransactionId } from "../../AuthActions";
import { amount } from "../../component/transactions";
import { useNavigate } from "react-router-dom";

export const ReceivePage = () => {
  const [isReceiving, setIsReceiving] = useState(false);
  const { user, dispatch } = useContext(AuthContext); // Отримання доступу до контексту автентифікації
  const [amount, setAmount] = useState("");
  const navigate = useNavigate(); // Отримання доступу до хуки useHistory

  const handleReceive = async () => {
    if (isReceiving) return;
    setIsReceiving(true);
    // Assume amount is available in the context or from user input

    dispatch({
      type: "ADD_TRANSACTION", // Дія для додавання транзакції
      payload: {
        id: generateTransactionId(), // Генерація унікального ідентифікатора для транзакції
        amount: amount,
        userIcon: user.icon, // Припускається, що зображення користувача доступне в контексті
        userName: user.name, // Припускається, що ім'я користувача доступне в контексті
        time: new Date().toISOString(),
        type: "receive", // Тип транзакції: Отримання
      },
    });

    // Останній код у цій функції
    navigate("/balance"); // Переход на сторінку /balance після створення транзакції
    setIsReceiving(false);
  };

  return (
    <div className="default-container">
      {/* Верстка не изменена, только функция handleReceive */}
      <h1>Отримати кошти</h1>
      <div className="input_field-container">
        <input
          className="input_field"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Вкажіть суму"
          required
        />
        <button className="continue-button" onClick={handleReceive}>
          Одержати
        </button>
      </div>
    </div>
  );
};

export default ReceivePage;

// 5 Файл ReceivePage
