// 1 Файл UserDataPage
// import React, { useContext } from "react";
// import { useParams, Link } from "react-router-dom";
// import { AuthContext } from "../../AuthContext";

// export const UserDataPage = () => {
//   const { userId } = useParams();
//   const { users, transactions } = useContext(AuthContext);

//   const user = users.find((user) => user.id === userId);
//   const userTransactions = transactions.filter(
//     (transaction) =>
//       transaction.from === user.email || transaction.to === user.email
//   );

//   return (
//     <div className="default-container">
//       <h1>{user.email}'s Transactions</h1>
//       <Link to="/users" className="nav_back-button">
//         Back to Users
//       </Link>
//       <ul>
//         {userTransactions.map((transaction) => (
//           <li key={transaction.transactionId}>
//             <strong>ID:</strong> {transaction.transactionId}
//             <br />
//             <strong>Type:</strong> {transaction.type}
//             <br />
//             <strong>Amount:</strong> ${transaction.amount}
//             <br />
//             <strong>From:</strong> {transaction.from}
//             <br />
//             <strong>To:</strong> {transaction.to}
//             <br />
//             <strong>Payment Method:</strong> {transaction.paymentMethod}
//             <br />
//             <strong>Status:</strong>{" "}
//             {transaction.isPending ? "Pending" : "Completed"}
//             <br />
//             <strong>Time:</strong> {new Date(transaction.time).toLocaleString()}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserDataPage;

// 1 Файл UserDataPage
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import TransactionList from "../../component/TransactionList";

const UserDataPage = () => {
  const { userId } = useParams();
  const { users, transactions } = useContext(AuthContext);

  const user = users.find((u) => u.id === userId);

  const userTransactions = transactions.filter(
    (transaction) =>
      transaction.from === user.email || transaction.to === user.email
  );

  return (
    <div className="default-container">
      <Link to="/users" className="nav_back-button">
        Назад
      </Link>
      <h1>User Data for {user.email}</h1>
      <TransactionList transactions={userTransactions} />
    </div>
  );
};

export default UserDataPage;
