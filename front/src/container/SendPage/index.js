// Файл SendPage Date 08.06.24 version-3
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

    //========== add DATE-12.06.24-23:42
    // const sendTransaction = {
    //   transactionId: generateTransactionId(),
    //   time: new Date().toISOString(),
    //   amount: parseFloat(amount),
    //   from: user.email,
    //   to: email,
    //   type: "send",
    //   paymentMethod,
    //   isPending: false,
    // };

    // console.log("Attempting to send transaction:", sendTransaction);

    // dispatch({
    //   type: "ADD_SEND_TRANSACTION",
    //   payload: sendTransaction,
    // });
    //========== add DATE-12.06.24-23:42 end

    // if (paymentMethod === "MoneyGram") {
    //   const transaction = {
    //     transactionId: generateTransactionId(),
    //     time: new Date().toISOString(),
    //     amount: parseFloat(amount),
    //     from: user.email,
    //     to: email,
    //     type: "receive",
    //     paymentMethod,
    //     isPending: false, //Переконується, що транзакція не очікується
    //   };
    //   console.log("Creating receive transaction:", transaction); // Log receive transaction

    //   dispatch({
    //     type: "ADD_TRANSACTION",
    //     payload: {...transaction},
    //   });
    // }

    //========== add paymentMethod === "MoneyGram" DATE-17.06.24-11:48
    if (paymentMethod === "MoneyGram") {
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
    //========== add paymentMethod === "MoneyGram" end DATE-17.06.24-11:48

    // dispatch({
    //   //Це чомусь створюється платіжним методом "MoneyGram"
    //   type: "ADD_EVENT",
    //   payload: {
    //     title: "Send Money",
    //     info: `Відправлено $${transaction.amount} на ${email} через ${transaction.paymentMethod} о ${transaction.time}`,
    //   },
    // });

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
            {["Western Union", "MoneyGram"].map((method) => (
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
