// File: TransactionList.js add DATE-10.06.24 version-1
// import React, { useContext } from "react";
// import { AuthContext } from "../../AuthContext";
// import { Link } from "react-router-dom";
// import transactions from "../../component/transactions"; //неузгоджене

// // const TransactionList = () => {
// //   const { transactions } = useContext(AuthContext);

// //   return (
// //     <div className="transaction-list">
// //       <h2>Transaction History</h2>
// //       <ul>
// //         {transactions.length > 0 ? (
// //           transactions.map((transaction) => (
// //             <li key={transaction.transactionId} className="transaction-item">
// //               <Link to={`/transaction/${transaction.transactionId}`}>
// //                 <div>
// //                   <strong>ID:</strong> {transaction.transactionId}
// //                   <br />
// //                   <strong>Date:</strong>{" "}
// //                   {new Date(transaction.time).toLocaleString()}
// //                   <br />
// //                   <strong>Type:</strong> {transaction.type}
// //                   <br />
// //                   <strong>Amount:</strong> ${transaction.amount}
// //                   <br />
// //                   <strong>From:</strong> {transaction.from}
// //                   <br />
// //                   <strong>To:</strong> {transaction.to}
// //                   <br />
// //                   <strong>Method:</strong> {transaction.paymentMethod}
// //                 </div>
// //               </Link>
// //             </li>
// //           ))
// //         ) : (
// //           <li>No transactions found.</li>
// //         )}
// //       </ul>
// //     </div>
// //   );
// // };
// // add DATE-10.06.24 version-2
// const TransactionList = ({ transactions }) => {
//   return (
//     <div className="transaction-list">
//       <h2>Transaction History</h2>
//       <ul>
//         {transactions.length > 0 ? (
//           transactions.map((transaction) => (
//             <li
//               key={transaction.transactionId}
//               className={`transaction-item ${
//                 transaction.isPending ? "pending" : ""
//               }`}
//             >
//               <Link to={`/transaction/${transaction.transactionId}`}>
//                 <div>
//                   <strong>ID:</strong> {transaction.transactionId}
//                   <br />
//                   <strong>Date:</strong>{" "}
//                   {new Date(transaction.time).toLocaleString()}
//                   <br />
//                   <strong>Type:</strong> {transaction.type}
//                   <br />
//                   <strong>Amount:</strong> ${transaction.amount}
//                   <br />
//                   <strong>From:</strong> {transaction.from}
//                   <br />
//                   <strong>To:</strong> {transaction.to}
//                   <br />
//                   <strong>Method:</strong> {transaction.paymentMethod}
//                   <br />
//                   <strong>Status:</strong>{" "}
//                   {transaction.isPending ? "Pending" : "Completed"}
//                 </div>
//               </Link>
//             </li>
//           ))
//         ) : (
//           <li>No transactions found.</li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default TransactionList;

// // Файл: TransactionList.js add DATE-10.06.24 version-3
// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../AuthContext"; // Adjust the path accordingly

// const TransactionList = () => {
//   const { user, transactions } = useContext(AuthContext);

//   // Filter transactions specific to the logged in user
//   const filteredTransactions = transactions.filter(
//     (t) =>
//       (t.from === user.email && t.type === "send") ||
//       (t.to === user.email && t.type === "receive")
//   );

//   return (
//     <div className="transaction-list">
//       <h2>Transaction History</h2>
//       <ul
//         style={{
//           maxHeight: "400px",
//           overflowY: "scroll" /* enable scroll */,
//           padding: 0,
//         }}
//       >
//         {filteredTransactions.length > 0 ? (
//           filteredTransactions.map((transaction) => (
//             <li
//               key={transaction.transactionId}
//               className={`transaction-item ${
//                 transaction.isPending ? "pending" : ""
//               }`}
//               style={{
//                 border: `3px solid ${
//                   transaction.type === "send" ? "orange" : "lightgreen"
//                 }` /* Styled border based on transaction type */,
//                 marginBottom: "10px",
//                 padding: "10px",
//               }}
//             >
//               <Link to={`/transaction/${transaction.transactionId}`}>
//                 <div>
//                   <strong>ID:</strong> {transaction.transactionId}
//                   <br />
//                   <strong>Date:</strong>{" "}
//                   {new Date(transaction.time).toLocaleString()}
//                   <br />
//                   <strong>Type:</strong> {transaction.type}
//                   <br />
//                   <strong>Amount:</strong> ${transaction.amount}
//                   <br />
//                   <strong>From:</strong> {transaction.from}
//                   <br />
//                   <strong>To:</strong> {transaction.to}
//                   <br />
//                   <strong>Method:</strong> {transaction.paymentMethod}
//                   <br />
//                   <strong>Status:</strong>{" "}
//                   {transaction.isPending ? "Pending" : "Completed"}
//                 </div>
//               </Link>
//             </li>
//           ))
//         ) : (
//           <li>No transactions found.</li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default TransactionList;

// Файл: TransactionList.js
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import "./style.css"; // Імпортуйте файл стилів

const TransactionList = () => {
  const { user, transactions: initialTransactions } = useContext(AuthContext);
  const [transactions, setTransactions] = useState(initialTransactions);

  // Utility function for time elapsed
  const timeElapsed = (timestamp) => {
    const now = Date.now();
    const diff = (now - new Date(timestamp).getTime()) / 1000; // difference in seconds

    if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `${minutes} minutes ago`;
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(diff / 86400);
      return `${days} days ago`;
    }
  };
  // Using useEffect to calculate and update time for each transaction
  useEffect(() => {
    const interval = setInterval(() => {
      setTransactions(
        transactions.map((transaction) => ({
          ...transaction,
          timeElapsed: timeElapsed(transaction.time),
        }))
      );
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [transactions]);

  // Фільтруємо транзакції, які відносяться до зареєстрованого користувача
  const filteredTransactions = transactions.filter(
    (t) =>
      (t.from === user.email && t.type === "send") ||
      (t.to === user.email && t.type === "receive")
  );

  return (
    <div className="transaction-container ">
      {/* <h2>Transaction History</h2> */}
      <div className="transaction-list">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <div key={transaction.transactionId}>
              <Link to={`/transaction/${transaction.transactionId}`}>
                <div className="transaction-item">
                  <div className="transaction-logo">
                    <img
                      src={`/transIcons/${
                        transaction.type === "send"
                          ? "transSend.svg"
                          : "transReseive.svg"
                      }`}
                      alt="Event logo"
                    />
                  </div>
                  <div className="transaction-details">
                    <div className="transaction-title">
                      <h3>
                        {transaction.type.send
                          ? transaction.from
                          : transaction.to}
                      </h3>
                    </div>
                    <div className="transaction-info">
                      <h4>
                        <span>{transaction.timeElapsed}</span>{" "}
                        <span>{transaction.type}</span>
                      </h4>
                    </div>
                  </div>
                  <div>
                    <h3
                      className={`transaction-amount ${
                        transaction.type === "send"
                          ? "amount-black"
                          : "amount-green"
                      }`}
                    >
                      {transaction.type === "send" ? "-" : "+"}$
                      {transaction.amount.toFixed(2)}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div>No transactions found.</div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
