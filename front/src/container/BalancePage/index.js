// 1 Файл BalancePage
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

export const BalancePage = () => {
  const { user, transactions } = useContext(AuthContext);

  // Забезпечення доступу до транзакційного списку
  const transactionList =
    transactions && Array.isArray(transactions) ? transactions : [];

  // Функція розрахунку балансу
  const calculateBalance = () => {
    return transactionList.reduce((balance, transaction) => {
      // За наявності типу транзакції "receive" додаємо суму, а за типом "send" віднімаємо
      return transaction.type === "receive"
        ? balance + parseFloat(transaction.amount)
        : balance - parseFloat(transaction.amount);
    }, 100); // Стартовий баланс $100
  };

  const balance = calculateBalance();
  console.log(`Current balance updated to: $${balance}`);

  return (
    <div className="default-container">
      <Link to="/settings" className="nav_back-button">
        Settings
      </Link>
      <Link
        to="/users"
        className="nav_back-button"
        style={{ right: "180px", left: "auto" }}
      >
        Users
      </Link>
      <Link
        to="/notifications"
        className="nav_back-button"
        style={{ right: "30px", left: "auto" }}
      >
        Notifications
      </Link>
      <h1>Main Wallet</h1>
      <h2>Ви увійшли як {user ? `${user.email}` : "User: Guest"}</h2>
      {/* Додавання електронної пошти користувача */}
      <p>Balance: ${balance}</p>
      <div style={{ marginTop: "20px" }}>
        {/* Відображення списку транзакцій, кожна зі своїм лінком */}
        {transactionList.map((transaction) => (
          <Link key={transaction.id} to={`/transaction/${transaction.id}`}>
            <div>
              <img src={transaction.userIcon} alt={user.email} />
              <span>
                {transaction.userName} - {transaction.time}
              </span>
              <span>
                {transaction.type === "receive" ? "+" : "-"}$
                {transaction.amount}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="button-container">
        <Link to="/receive" className="continue-button">
          Receive
        </Link>
        <Link to="/send" className="login-button">
          Send
        </Link>
      </div>
    </div>
  );
};

export default BalancePage;
