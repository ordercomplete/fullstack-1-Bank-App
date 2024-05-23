//Файл transactions (компонент)
import { generateTransactionId } from "../../AuthActions";

// База даних транзакцій
export const transactionsDatabase = [];

export const createTransaction = (amount, userId, type) => {
  // Перевірка, чи передані всі необхідні параметри
  if (!amount || !userId || !type) {
    return {
      success: false,
      message: "Всі поля є обов'язковими для заповнення.",
    };
  }

  const newTransaction = {
    id: generateTransactionId(), // Генерація унікального ID для нової транзакції
    amount,
    userId,
    type, // 'credit' або 'debit'
    date: new Date().toISOString(),
  };

  transactionsDatabase.push(newTransaction);
  console.log(`Створено нову транзакцію: ID ${newTransaction.id}`);

  return { success: true, transaction: newTransaction };
};

// Приклад використання функції створення транзакції
export const amount = 100.0; // Тут повинен бути стартовий баланс
export const userId = 12345; // Тут повинен бути фактичний userID
export const type = "credit"; // Тип транзакції: 'credit' або 'debit'

export const transactionResult = createTransaction(amount, userId, type);
console.log(transactionResult);
