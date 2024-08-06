// Файл TransactionPage DATE 05.06.24 version-1
// import React, { useContext } from "react";
// import { Link, useParams } from "react-router-dom";
// import { AuthContext } from "../../AuthContext";

// export const TransactionPage = () => {
//   const { transactionId } = useParams(); // Getting transactionId from route params
//   const { transactions } = useContext(AuthContext);
//   const { user } = useContext(AuthContext);
//   const transaction = transactions.find(
//     (t) => t.id === parseInt(transactionId)
//   );

//   if (!transaction) {
//     console.error("Transaction not found with ID:", transactionId);
//     return <p>Transaction not found.</p>;
//   }

//   return (
//     <div className="default-container">
//       <Link to="/balance" className="nav_back-button">
//         Back
//       </Link>
//       <h1>Transaction Details</h1>
//       <div className="transaction-details">
//         <p>
//           <strong>Тип транзакції:</strong> {transaction.type}
//         </p>
//         <p>
//           <strong>Сума:</strong> ${transaction.amount}
//         </p>
//         <p>
//           <strong>Email отримувача:</strong> {user.email}
//         </p>

//         <p>
//           <strong>Час транзакції:</strong>{" "}
//           {new Date(transaction.time).toLocaleString()}
//         </p>
//         <p>
//           <strong>Transaction ID:</strong> {transaction.id}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default TransactionPage;

// Файл TransactionPage DATE 05.06.24 version-2
import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext"; // Adjust the path accordingly

const TransactionPage = () => {
  const { transactionId } = useParams();
  const { transactions } = useContext(AuthContext);

  // const transaction = transactions.find(
  //   (tran) => tran.transactionId === transactionId
  // );

  //Додано DATE 05.06.24 version-2
  const transaction = transactions.find(
    (tran) => String(tran.transactionId) === String(transactionId) // Ensure both are strings for comparison Переконайтеся, що обидва є рядками для порівняння
  );

  if (!transaction) {
    return (
      <div className="default-container">
        <Link to="/balance" className="nav_back-button">
          Назад
        </Link>
        <h1>Transaction not found</h1>
      </div>
    );
  }

  return (
    <div className="default-container">
      <Link to="/balance" className="nav_back-button">
        Назад
      </Link>
      <h1>Деталі транзакції</h1>
      <p>ID Транзакції: {transaction.transactionId}</p>
      <p>Дата: {new Date(transaction.time).toLocaleString()}</p>
      <p>
        Користувач: {transaction.from} to {transaction.to}
      </p>
      <p>Сума: ${transaction.amount}</p>
      <p>Тип: {transaction.type}</p>
      <p>Платіжний метод: {transaction.paymentMethod}</p>
    </div>
  );
};

export default TransactionPage;
