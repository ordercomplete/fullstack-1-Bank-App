// Файл AuthActions
// Створення унікального userId
export const userIdGenerator = () => {
  return Math.random().toString(36).substring(2, 15);
};
// Генератор випадкових ідентифікаторів
export const generateTransactionId = () => {
  return Math.floor(Math.random() * 1000000); // Генеруємо випадкове число до 1000000
};

export const usersDatabase = [];

export const registerUser = (email, password, confirmationCode) => {
  const exists = usersDatabase.some((user) => user.email === email);
  // Приклад додавання користувачів до контексту

  if (exists) {
    return { success: false, message: "Користувач уже зареєстрований." };
  }

  const newUser = {
    id: userIdGenerator(), // Генерація унікального id при створенні користувача
    email,
    password,
    confirmationCode,
    confirmed: false,
  };

  usersDatabase.push(newUser);
  console.log(`AuthActions: Реєстрація нового користувача: ${email}`);

  return {
    success: true,
    message: "Користувач успішно зареєстрований.",
    user: newUser,
  };
};

export const updatePassword = (email, newPassword) => {
  const userIndex = usersDatabase.findIndex((user) => user.email === email);

  if (userIndex === -1) {
    return { success: false, message: "Користувач не знайдений." };
  }

  usersDatabase[userIndex].password = newPassword;

  console.log(`Пароль для ${email} оновлено успішно.`);
  return { success: true, message: "Пароль оновлено успішно." };
};

export const deleteAccount = (email, password) => {
  const userIndex = usersDatabase.findIndex((user) => user.email === email);

  if (userIndex === -1) {
    return { success: false, message: "Користувач не знайдений." };
  }

  const user = usersDatabase[userIndex];
  if (user.password !== password) {
    return { success: false, message: "Невірний пароль." };
  }

  usersDatabase.splice(userIndex, 1); // Видалення користувача
  console.log(`Акаунт ${email} видалено.`);

  return { success: true, message: "Акаунт успішно видалено." };
};
