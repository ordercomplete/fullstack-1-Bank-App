// Файл transactions.js (компонент)
export const handleAddTransaction = (state, action) => {
  const transaction = action.payload;
  let newState = {
    ...state,
    transactions: [...state.transactions, transaction],
    users: state.users.map((user) => {
      if (user.email === transaction.from) {
        return { ...user, balance: user.balance - transaction.amount };
      }
      if (
        transaction.paymentMethod === "Money Gram" &&
        user.email === transaction.to
      ) {
        return { ...user, balance: user.balance + transaction.amount };
      }
      return user;
    }),
    pendingTransactions: state.pendingTransactions || [],
  };

  if (transaction.paymentMethod === "Western Union") {
    newState.pendingTransactions = [
      ...(newState.pendingTransactions || []),
      transaction.transactionId,
    ];
  }

  console.log("Action ADD_TRANSACTION:", action, "New State:", newState);
  return newState;
};

export const handleConfirmTransactionStatus = (state, action) => {
  const { transactionId } = action.payload;
  let newState = {
    ...state,
    transactions: state.transactions.map((t) =>
      t.transactionId === transactionId ? { ...t, isPending: false } : t
    ),
    users: state.users.map((user) => {
      const pendingTransaction = state.transactions.find(
        (t) => t.transactionId === transactionId
      );

      if (user.email === pendingTransaction.to) {
        return {
          ...user,
          balance: user.balance + pendingTransaction.amount,
        };
      }
      return user;
    }),
    pendingTransactions: (state.pendingTransactions || []).filter(
      (id) => id !== transactionId
    ),
  };

  console.log("Action CONFIRM_TRANSACTION:", action, "New State:", newState);
  return newState;
};
