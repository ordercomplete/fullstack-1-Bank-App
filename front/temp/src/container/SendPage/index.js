// Файл SendPage
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { generateTransactionId } from "../../AuthActions";
import { Link } from "react-router-dom";

export const SendPage = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Western Union");
  const [isSending, setIsSending] = useState(false);
  const { user, users, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSend = async (event) => {
    event.preventDefault();

    console.log("Handling send..."); // Log send attempt, add DATE-12.06.24

    if (isSending) return;
    setIsSending(true);

    if (!email || email === user.email) {
      alert("Недопустимий email одержувача.");
      setIsSending(false);
      return;
    }

    const recipient = users.find((u) => u.email === email);
    if (!recipient) {
      alert("Email одержувача не знайдено в системі.");
      setIsSending(false);
      return;
    }

    const transaction = {
      transactionId: generateTransactionId(),
      time: new Date().toISOString(),
      amount: parseFloat(amount),
      from: user.email,
      to: email,
      type: "send",
      paymentMethod,
      isPending: paymentMethod === "Western Union", // Add pending for Western Union
    };

    console.log("Спроба відправити транзакцію:", transaction);

    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });

    if (paymentMethod === "Money Gram") {
      dispatch({
        type: "ADD_TRANSACTION",
        payload: {
          ...transaction,
          type: "receive",
          from: user.email,
          to: email,
          isPending: false,
        },
      });
    }

    console.log("Dispatched SEND transaction:", transaction);

    navigate("/balance");
    setIsSending(false);
  };

  return (
    <div className="default-container-auth">
      <h2>Ви увійшли як {user ? `${user.email}` : "Guest"}</h2>
      <Link to="/balance" className="nav_back-button">
        Назад
      </Link>

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
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Сума"
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
                />{" "}
                {method}
              </label>
            ))}
          </div>
        </div>
        <button type="submit" className="continue-button">
          Відправити
        </button>
      </form>
    </div>
  );
};

export default SendPage;
