// 1 Файл TransactionPage
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

export const TransactionPage = () => {
  const { transactions } = useContext(AuthContext);

  return (
    <div className="default-container">
      <Link to="/balance" className="nav_back-button">
        Back
      </Link>
      <h1>Транзакції</h1>
      <div className="transaction-list">
        {transactions.map((transaction, index) => (
          <div key={index} className="transaction-item">
            <p>Тип: {transaction.type}</p>
            <p>Сума: ${transaction.amount}</p>
            <p>На email: {transaction.email}</p>
            <p>Дата: {transaction.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionPage;
