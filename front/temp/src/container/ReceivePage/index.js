// Файл ReceivePage Date 08.06.24 version-3
import React, { useState, useContext } from "react";
import {
  generateTransactionId,
  // updateTransactionStatus,
  confirmTransaction,
} from "../../AuthActions";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ReceivePage = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Western Union");
  const [isReceiving, setIsReceiving] = useState(false);
  const { user, users, transactions, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [transactionId, setTransactionId] = useState("");

  const handleReceive = async (event) => {
    event.preventDefault();

    console.log("Handling receive...", transactions); // Log receive attempt

    if (isReceiving) return;
    setIsReceiving(true);

    if (!email || email === user.email) {
      alert("Недопустиме ім'я відправника");
      setIsReceiving(false);
      return;
    }

    const sender = users.find((u) => u.email === email);
    if (!sender) {
      alert("Sender email not found in the database.");
      setIsReceiving(false);
      return;
    }

    const transactionAmount = parseFloat(amount);

    const correspondingSendTransaction = transactions.find(
      (tran) =>
        tran.transactionId === transactionId && // Use transactionId as string
        tran.from === email &&
        tran.to === user.email &&
        tran.amount === transactionAmount &&
        tran.paymentMethod === paymentMethod &&
        tran.type === "send"
    );

    if (
      !correspondingSendTransaction ||
      !correspondingSendTransaction.isPending //add 17.06.24-12:03
    ) {
      alert("No corresponding send transaction found.");
      setIsReceiving(false);
      return;
    }

    // Confirm the transaction
    confirmTransaction(correspondingSendTransaction.transactionId, dispatch);

    const transaction = {
      transactionId: generateTransactionId(),
      time: new Date().toISOString(),
      amount: transactionAmount,
      from: email,
      to: user.email,
      type: "receive",
      paymentMethod,
      isPending: false, //add DATE-10.06.24. version-1
    };

    console.log("Attempting to receive transaction:", transaction);

    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });

    dispatch({
      type: "ADD_EVENT",
      payload: {
        title: "Receive Money",
        info: `Отримання $${transaction.amount} від ${transaction.paymentMethod} о ${transaction.time}`,
      },
    });

    console.log("Dispatched RECEIVE transaction:", transaction);

    navigate("/balance");
    setIsReceiving(false);
  };

  return (
    <div className="default-container-auth">
      <h2>Ви увійшли як {user ? `${user.email}` : "Guest"}</h2>
      <Link to="/balance" className="nav_back-button">
        Назад
      </Link>
      <h1>Отримати кошти</h1>
      <form onSubmit={handleReceive}>
        <div className="input_field-container">
          <input
            className="input_field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email відправника"
            required
          />
          <input
            className="input_field"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Вкажіть суму"
            required
          />
          <input //add DATE-10.06.24. version-1
            className="input_field"
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="ID транзакції"
            required
          />
          <div className="payment-methods">
            {["Western Union", "Money Gram"].map((method) => (
              <label key={method}>
                <input
                  type="radio"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                {method}
              </label>
            ))}
          </div>
        </div>
        <button type="submit" className="continue-button">
          Одержати
        </button>
      </form>
    </div>
  );
};

export default ReceivePage;
