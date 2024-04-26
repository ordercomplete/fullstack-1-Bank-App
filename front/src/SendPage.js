import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

function SendPage() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const { sendData } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // відправка даних через контекстний метод sendData
      await sendData({ email, amount });
      // Логіка після успішної транзакції (можливі редирект або показ нотифікації)
      alert("Transaction successful!");
    } catch (error) {
      console.error("Error during the send operation:", error);
      alert("Failed to complete the transaction.");
    }
  };

  return (
    <div>
      <h1>Send Money</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            required
          />
        </label>
        <button type="submit">Send Money</button>
      </form>
    </div>
  );
}

export default SendPage;
