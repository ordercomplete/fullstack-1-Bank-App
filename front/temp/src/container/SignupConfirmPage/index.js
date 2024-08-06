// Файл SignupConfirmPage Date 31.05.2024
// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../AuthContext";
// import { confirmUser } from "../../AuthActions";
// import TitleComponent from "../../component/TitleComponent";
// import PasswordInput from "../../component/PasswordInput";

// export const SignupConfirmPage = () => {
//   const [confirmationCodeInput, setConfirmationCodeInput] = useState("");
//   const navigate = useNavigate();
//   const { users, dispatch } = useContext(AuthContext);

//   const handleConfirm = (event) => {
//     event.preventDefault();

//     console.log("Entered confirmation code:", confirmationCodeInput); // Logging the entered confirmation cod

//     if (!users || users.length === 0) {
//       console.error("No users found in context.");
//       alert("No users available to confirm.");
//       return;
//     }
//     const user = users.find(
//       //users instead of usersDatabase change 15.06.24-12:48
//       (u) => u.confirmationCode === confirmationCodeInput && !u.confirmed
//     );

//     if (user) {
//       const confirmationResult = confirmUser(
//         user.email,
//         confirmationCodeInput,
//         users,
//         dispatch
//       );

//       if (confirmationResult.success) {
//         alert("Код підтверджений. Ви ввійшли в систему.");
//         navigate("/balance");
//         console.log("User confirmed and logged in:", user);
//       } else {
//         alert("Невірний код підтвердження або вже використаний-1.");
//       }
//     } else {
//       alert("Невірний код підтвердження або вже використаний-2.");
//     }
//   };

//   //for title=================
//   // Replace with actual authentication state
//   const isAuthenticated = true; //user.email знайти підтвердження авторизації від системи
//   // Якщо у вас вже є змінна, що містить різні назви для сторінок
//   const pageTitle = "Settings"; // Тут можна передати потрібний заголовок
//   //for title=================

//   return (
//     <div className="default-container">
//       {/* title ідентичний для всіх сторінок */}
//       <TitleComponent pageTitle={pageTitle} isAuthenticated={isAuthenticated} />
//       <h4 className="text-under-title">Write the code you received</h4>
//       <form onSubmit={handleConfirm} className="input_field-container">
//         <PasswordInput
//           // type={confirmationCode}
//           value={confirmationCodeInput}
//           onChange={(e) => setConfirmationCodeInput(e.target.value)}
//         />
//         <button type="submit" className="continue-button">
//           Підтвердити
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignupConfirmPage;

// Файл SignupConfirmPage Date 31.05.2024
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { confirmUser } from "../../AuthActions";
import TitleComponent from "../../component/TitleComponent";
import PasswordInput from "../../component/PasswordInput";
import Swal from "sweetalert2"; // Import SweetAlert2

export const SignupConfirmPage = () => {
  const [confirmationCodeInput, setConfirmationCodeInput] = useState("");
  const navigate = useNavigate();
  const { users, dispatch } = useContext(AuthContext);

  const handleConfirm = (event) => {
    event.preventDefault();

    console.log("Entered confirmation code:", confirmationCodeInput);

    if (!users || users.length === 0) {
      console.error("No users found in context.");
      alert("No users available to confirm.");
      return;
    }

    const user = users.find(
      (u) => u.confirmationCode === confirmationCodeInput && !u.confirmed
    );

    if (user) {
      const confirmationResult = confirmUser(
        user.email,
        confirmationCodeInput,
        users,
        dispatch
      );

      if (confirmationResult.success) {
        Swal.fire({
          title: "Код підтверджений",
          text: "Ви ввійшли в систему.",
          icon: "success",
        }).then(() => {
          navigate("/balance");
          console.log("User confirmed and logged in:", user);
        });
      } else {
        Swal.fire({
          title: "Помилка",
          text: "Невірний код підтвердження або вже використаний.",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Помилка",
        text: "Невірний код підтвердження або вже використаний.",
        icon: "error",
      });
    }
  };

  const pageTitle = "Settings";
  const isAuthenticated = true;

  return (
    <div className="default-container">
      <TitleComponent pageTitle={pageTitle} isAuthenticated={isAuthenticated} />
      <h4 className="text-under-title">Write the code you received</h4>
      <form onSubmit={handleConfirm} className="input_field-container">
        <PasswordInput
          value={confirmationCodeInput}
          onChange={(e) => setConfirmationCodeInput(e.target.value)}
        />
        <button type="submit" className="continue-button">
          Підтвердити
        </button>
      </form>
    </div>
  );
};

export default SignupConfirmPage;
