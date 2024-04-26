import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function TransactionPage() {
  const [transaction, setTransaction] = useState(null);
  const { transactionId } = useParams();
  const { fetchTransaction } = useContext(AuthContext);

  useEffect(() => {
    const loadTransaction = async () => {
      try {
        const data = await fetchTransaction(transactionId);
        setTransaction(data);
      } catch (error) {
        console.error("Failed to fetch transaction:", error);
      }
    };
    loadTransaction();
  }, [transactionId, fetchTransaction]);

  return (
    <div>
      <h1>Transaction Details</h1>
      {transaction ? (
        <div>
          <p>Transaction ID: {transaction.id}</p>
          <p>Amount: {transaction.amount}</p>
          <p>Sender: {transaction.sender}</p>
          <p>Recipient: {transaction.recipient}</p>
          <p>Date: {transaction.date}</p>
        </div>
      ) : (
        <p>Loading transaction details...</p>
      )}
    </div>
  );
}

export default TransactionPage;
