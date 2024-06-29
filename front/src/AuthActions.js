// Файл AuthActions Date 05.06.24 version-1
// Створення унікального userId
export const userIdGenerator = (email) => {
  const datePart = new Date().toISOString().replace(/\D/g, "");
  const emailPart = email.replace(/[^a-zA-Z0-9]/g, "");
  return `${emailPart}_${datePart}`;
};
// export const userIdGenerator = () => {
//   return Math.random().toString(36).substring(2, 15);
// };

// Генератор випадкових ідентифікаторів
export const generateTransactionId = () => {
  return new Date().toISOString().replace(/\D/g, "");
};
// export const generateTransactionId = () => {
//   return Math.floor(Math.random() * 1000000); // Генеруємо випадкове число до 1000000
// };

export const generateConfirmationCode = () => {
  //add 15.06.24-22:46
  return Math.random().toString(36).substring(2, 12);
};

//add const registerUser 15.06.24-19:03
export const registerUser = (email, password, dispatch) => {
  const confirmationCode = generateConfirmationCode();

  const newUser = {
    id: userIdGenerator(email), // Updated to use new userIdGenerator
    email,
    password,
    confirmationCode,
    confirmed: false,
    isAdmin: email === "admin@admin", // Assign admin status if email is admin@admin
  };

  dispatch({
    type: "REGISTER_USER",
    payload: {
      newUser,
    },
  });

  console.log(`AuthActions: Registered new user: ${email}`);
  return {
    success: true,
    message: "User successfully registered.",
    user: newUser,
  };
};

// [Додано users параметр до confirmUser функції та використано його всередині]
export const confirmUser = (email, confirmationCode, users, dispatch) => {
  const user = users.find(
    (u) => u.email === email && u.confirmationCode === confirmationCode
  );

  if (user) {
    dispatch({
      type: "CONFIRM_USER",
      payload: { email, confirmationCode }, // Only use email and confirmationCode as payload
    });
    console.log(`User ${email} confirmed successfully.`);
    return { success: true, message: "User confirmed successfully." };
  } else {
    console.log(`Failed to confirm user ${email}.`);
    return { success: false, message: "Invalid confirmation code." };
  }
};

// add const updatePassword  15.06.24-11:52
export const updatePassword = (email, newPassword, dispatch) => {
  dispatch({
    type: "UPDATE_USER_PASSWORD",
    payload: { email, newPassword },
  });
  //add console.log and return 15.06.24-11:56
  console.log(`Пароль для ${email} оновлено успішно.`);
  return { success: true, message: "Пароль оновлено успішно." };
};

// // add const updatePassword  15.06.24-11:58
// export const deleteAccount = (email) => {
//   // dispatch({
//   //   type: "REMOVE_USER",
//   //   payload: { email },
//   // });
//   //add console.log and return 15.06.24-12:01
//   console.log(`Акаунт ${email} видалено.`);
//   return { success: true, message: "Акаунт успішно видалено." };
// };

//заміна userRole на loggedInUser також "userRole !== "admin" && email === user.email" на "loggedInUser.email !== email && !loggedInUser.isAdmin" 20.06.24-21:22
export const deleteAccount = (user, email, dispatch, loggedInUser) => {
  if (
    loggedInUser.email !== email &&
    !loggedInUser.isAdmin &&
    email === user.email
  ) {
    console.log("No privilege to delete the account.");
    return { success: false, message: "No privilege to delete the account." };
  }

  dispatch({
    type: "REMOVE_USER",
    payload: { email },
  });

  console.log(`Акаунт ${email} видалено.`);
  return { success: true, message: "Акаунт успішно видалено." };
};
//Створено для сторінки адміна
export const deleteUserAccount = (email, dispatch) => {
  dispatch({
    type: "REMOVE_USER",
    payload: { email },
  });

  console.log(`Account for ${email} has been deleted.`);
};

//add case "CONFIRM_TRANSACTION" 17.06.24-11:31 instead of UPDATE_TRANSACTION_STATUS: DATE-10.06.24.
export const confirmTransaction = (transactionId, dispatch) => {
  dispatch({
    type: "CONFIRM_TRANSACTION",
    payload: { transactionId },
  });

  console.log(`Transaction ${transactionId} confirmed.`);
  return {
    success: true,
    message: `Transaction ${transactionId} confirmed.`,
  };
};
