// Файл BalancePage Date 10.06.24 version-3
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext"; // Adjust the path accordingly
import TransactionList from "../../component/TransactionList";
import "./style.css";

export const BalancePage = () => {
  // const { user, transactions, dispatch } = useContext(AuthContext);
  const { user, dispatch, transactions } = useContext(AuthContext);
  // const {  } = state;

  //=== add DATE-10.06.24. version-2 ===//
  const calculateBalance = () => {
    return transactions.reduce((balance, transaction) => {
      if (!transaction.isPending) {
        if (transaction.type === "receive" && transaction.to === user.email) {
          return balance + parseFloat(transaction.amount);
        } else if (
          transaction.type === "send" &&
          transaction.from === user.email
        ) {
          return balance - parseFloat(transaction.amount);
        }
      }
      return balance;
    }, user.balance || 0); // Start with the user's initial balance
  };
  //=== add DATE-10.06.24. version-2 end ===//

  const balance = calculateBalance();
  console.log(`Current balance updated to: $${balance}`);

  const handleClearTransactions = () => {
    dispatch({ type: "CLEAR_TRANSACTIONS" });
  };
  //знайти точне місце для const pendingTransactions
  const pendingTransactions = transactions.filter(
    (t) => t.from === user.email && t.isPending
  );

  // const userTransactions = transactions.filter(
  //   (transaction) =>
  //     transaction.from === user.email || transaction.to === user.email
  // );
  // const userPendingTransactions = userTransactions.filter((transaction) =>
  //   pendingTransactions.includes(transaction.transactionId)
  // );

  return (
    <div className="balance-container jost-font-text">
      <div className="balance-background-container">
        <div className="Status-Bar-Box">
          <img
            className="Status-Bar"
            src="svg/Status-Bar-White.svg"
            alt="icon-enter"
          />
        </div>
        {/* <div className="balance-users-block">
          <h4 className="current-user">
            <span>
              <img
                className="icon-enter"
                src="loginIcons/log-in_white.svg"
                alt="icon-enter"
              />
            </span>
            <span> {user ? `${user.email}` : "Guest"}</span>
          </h4>
          <h4 className="users-list">
            {user && user.email === "admin@admin" && user.isAdmin && (
              <Link to="/users" className="balance-users-icon-link">
                Users
              </Link>
            )}
          </h4>
        </div> */}
        <div className="balance-icons-block">
          <Link to="/settings" className="settings-icon-link">
            <img src="svg/settings.svg" alt="Settings" />
          </Link>

          <h3 className="icons">Main wallet</h3>

          <Link to="/notifications" className="notifications-icon-link">
            <img src="svg/bell-ringing.svg" alt="Notifications" />
          </Link>
        </div>

        <h1 className="balance-amount">{balance.toFixed(2)}$</h1>
        <div className="balance-users-block">
          <h4 className="current-user">
            <span>
              {/* <img
                className="icon-enter"
                src="loginIcons/log-in_white.svg"
                alt="icon-enter"
              /> */}
            </span>
            <span> {user ? `${user.email}` : "Guest"}</span>
          </h4>
          <h4 className="users-list">
            {user && user.email === "admin@admin" && user.isAdmin && (
              <Link to="/users" className="balance-users-icon-link">
                <img
                  className="icon-enter"
                  src="loginIcons/users_white.svg"
                  alt="icon-enter"
                />
              </Link>
            )}
          </h4>
        </div>
      </div>
      <div className="balance-icons-container">
        <Link to="/receive" className="reseive-button">
          <img src="svg/reseive-button.svg" alt="Receive" />
          <h4>Receive</h4>
        </Link>
        <Link to="/send" className="send-button">
          <img src="svg/send-button.svg" alt="Send" />
          <h4>Send</h4>
        </Link>
      </div>

      {pendingTransactions.length > 0 && (
        <div>
          <h3>Reserved Funds</h3>
          {pendingTransactions.map((t) => (
            <p key={t.transactionId}>
              ${t.amount} reserved for transaction ID {t.transactionId}
            </p>
          ))}
        </div>
      )}

      <div className="balance-TransactionList">
        <TransactionList transactions={transactions} />
      </div>
      <button onClick={handleClearTransactions} className="clear-button">
        Clear Transactions
      </button>
      {/* <div className="balance-users-block">
        <h4 className="current-user">
          <span>
            <img
              className="icon-enter"
              src="loginIcons/log-in_white.svg"
              alt="icon-enter"
            />
          </span>
          <span> {user ? `${user.email}` : "Guest"}</span>
        </h4>
        <h4 className="users-list">
          {user && user.email === "admin@admin" && user.isAdmin && (
            <Link to="/users" className="balance-users-icon-link">
              Users
            </Link>
          )}
        </h4>
      </div> */}
    </div>
  );
};
export default BalancePage;
