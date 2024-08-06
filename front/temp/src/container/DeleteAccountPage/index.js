// Файл DeleteAccountPage.js
// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../AuthContext";
// import { deleteAccount } from "../../AuthActions"; // Припустимо, ви додали функцію deleteAccount

// export const DeleteAccountPage = () => {
//   const navigate = useNavigate();
//   const { dispatch } = useContext(AuthContext); //Доданий users Date 03.06.2024
//   const [error, setError] = useState("");

//   const handleDelete = (event) => {
//     event.preventDefault();
//     const { email, password } = event.target.elements;

//     const deleteResponse = deleteAccount(email.value, password.value);

//     if (deleteResponse.success) {
//       dispatch({
//         type: "LOGOUT",
//       });
//       console.log(`Акаунт ${email.value} видалено.`); // Додано лог видалення
//       alert("Акаунт успішно видалено.");
//       navigate("/"); // Переадресація на головну сторінку
//     } else {
//       setError(deleteResponse.message);
//     }
//   };

//   return (
//     <div className="default-container">
//       <button onClick={() => navigate(-1)} className="nav_back-button">
//         Назад
//       </button>
//       <h1>Видалення акаунту</h1>
//       <form onSubmit={handleDelete}>
//         <div className="input_field-container">
//           <input
//             className="input_field"
//             name="email"
//             placeholder="Email"
//             required
//           />
//           <input
//             className="input_field"
//             name="password"
//             type="password"
//             placeholder="Password"
//             required
//           />
//         </div>
//         {error && <p className="error-message">{error}</p>}
//         <button type="submit" className="continue-button">
//           Видалити акаунт
//         </button>
//       </form>
//     </div>
//   );
// };

// export default DeleteAccountPage;

// 2 Файл DeleteAccountPage.js
import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { deleteAccount } from "../../AuthActions";
import { NavigationLink } from "../../component/NavigationLink";

export const DeleteAccountPage = () => {
  const navigate = useNavigate();
  const { user, users, dispatch } = useContext(AuthContext); // Added users context
  const [error, setError] = useState("");

  const handleDelete = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    //change "user" to "userToDelete" changed in three places 20.06.24
    const userToDelete = users.find((user) => user.email === email.value);

    if (!userToDelete) {
      setError("Користувач не знайдений");
      console.log("Delete Account: User not found", email.value);
      return;
    }

    if (userToDelete.password !== password.value) {
      setError("Невірний пароль");
      console.log("Delete Account: Incorrect password for", email.value);
      return;
    }

    const deleteResponse = deleteAccount(
      email.value,
      password.value,
      dispatch,
      user
    );

    // if (deleteResponse.success) {
    //   dispatch({
    //     type: "LOGOUT",
    //   });
    //   console.log(`Account ${email.value} deleted.`);
    //   alert("Account successfully deleted.");
    //   navigate("/");
    // } else {
    //   setError(deleteResponse.message);
    // }

    if (deleteResponse.success) {
      dispatch({
        type: "REMOVE_USER",
        payload: { email: email.value },
      }); // Dispatch remove user action

      dispatch({
        type: "LOGOUT",
      });
      console.log(`Account ${email.value} deleted.`);
      alert("Account successfully deleted.");
      navigate("/");
    } else {
      setError(deleteResponse.message);
    }
  };

  return (
    <div className="default-container-auth">
      <h2>Ви увійшли як {user ? `${user.email}` : "Guest"}</h2>

      <div>
        <button onClick={() => navigate(-1)} className="nav_back-button">
          Назад
        </button>
        <NavigationLink isAuthenticated={Boolean(user)} />
      </div>
      <h1>Delete Account</h1>
      <form onSubmit={handleDelete}>
        <div className="input_field-container">
          <input
            className="input_field"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className="input_field"
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="continue-button">
          Delete Account
        </button>
      </form>
    </div>
  );
};

export default DeleteAccountPage;
