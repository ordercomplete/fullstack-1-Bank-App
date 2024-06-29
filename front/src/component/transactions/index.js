// Файл transactions.js (компонент) DATE-12.06.24-0:22 version-3
// export const handleAddTransaction = (state, transaction) => {
//   console.log("Handling transaction:", transaction); // Log the transaction

//   if (
//     !transaction.transactionId ||
//     !transaction.type ||
//     !transaction.from ||
//     !transaction.to ||
//     !transaction.paymentMethod
//   ) {
//     console.error("Invalid transaction data:", transaction);
//     return state;
//   }

//   const updatedTransactions = [...state.transactions, transaction];

//   const updatedUsers = state.users.map((user) => {
//     if (user.email === transaction.from && transaction.type === "send") {
//       console.log(
//         `Updating balance for ${user.email}: subtracting ${transaction.amount}`
//       );
//       return { ...user, balance: (user.balance || 0) - transaction.amount };
//     } // прибрано else
//     if (user.email === transaction.to && transaction.type === "receive") {
//       console.log(
//         `Updating balance for ${user.email}: adding ${transaction.amount}`
//       );
//       return { ...user, balance: (user.balance || 0) + transaction.amount };
//     }
//     return user;
//   });

//   //Заміна const updatedUsers, version-2 end ===add Date 12.06.24-16:12===//
//   return {
//     ...state,
//     transactions: updatedTransactions,
//     users: updatedUsers,
//   };
// };

// export const handleUpdateTransactionStatus = (state, transactionId) => {
//   const updatedTransactions = state.transactions.map((trans) => {
//     if (trans.transactionId === transactionId) {
//       return { ...trans, isPending: false };
//     }
//     return trans;
//   });

//   const updatedUsers = state.users.map((user) => {
//     const trans = updatedTransactions.find(
//       (t) => t.transactionId === transactionId
//     );
//     if (trans && trans.type === "send" && user.email === trans.from) {
//       console.log(
//         `Updating balance for ${user.email}: subtracting ${trans.amount}`
//       );
//       return { ...user, balance: (user.balance || 0) - trans.amount };
//     } else if (trans && trans.type === "receive" && user.email === trans.to) {
//       console.log(`Updating balance for ${user.email}: adding ${trans.amount}`);
//       return { ...user, balance: (user.balance || 0) + trans.amount };
//     }
//     return user;
//   });

//   return {
//     ...state,
//     transactions: updatedTransactions,
//     users: updatedUsers,
//   };
// };

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
        transaction.paymentMethod === "MoneyGram" &&
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
