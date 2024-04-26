import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

function RecivePage() {
  const [amount, setAmount] = useState(0);
  const { updateBalance } = useContext(AuthContext);

  const handleReceive = () => {
    // Логіка для оновлення балансу
    updateBalance((prev) => prev + amount);
    alert(`Successfully added ${amount} to your balance.`);
  };

  return (
    <div>
      <h1>Receive Money</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <button type="button" onClick={handleReceive}>
          Add to Balance
        </button>
      </form>
    </div>
  );
}

export default RecivePage;
