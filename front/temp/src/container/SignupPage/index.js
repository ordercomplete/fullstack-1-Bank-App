// 1 Файл SignupPage.js Date 03.06.2024
// import React, { useState, useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { AuthContext } from "../../AuthContext";
// import { registerUser } from "../../AuthActions";
// import Swal from "sweetalert2"; // Import SweetAlert2
// import PasswordInput from "../../component/PasswordInput";
// import TitleComponent from "../../component/TitleComponent";
// import "./style.css";

// export const SignupPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const { dispatch, users } = useContext(AuthContext);

//   const handleSignup = async (event) => {
//     event.preventDefault();

//     console.log("Attempting to register user with email:", email);

//     const userExists =
//       users && users.some((user) => user && user.email === email); //(...user) або (user)?
//     if (userExists) {
//       alert("Користувач з такою електронною поштою вже існує.");
//       return;
//     }

//     const registrationResult = registerUser(
//       email,
//       password,
//       dispatch //add 15.06.24-13:10
//     );

//     if (registrationResult.success) {
//       dispatch({
//         type: "LOGIN",
//         payload: { token: "temporary_token", user: registrationResult.user }, // Fixed newUser to user
//       });
//       alert(
//         `Реєстрація пройшла успішно. Ваш код підтвердження: ${registrationResult.user.confirmationCode}`
//       );
//       navigate("/signup-confirm");
//     } else {
//       alert(registrationResult.message);
//     }
//   };

//   //for title=================
//   // Replace with actual authentication state
//   // const isAuthenticated = false;
//   // Якщо у вас вже є змінна, що містить різні назви для сторінок
//   const pageTitle = "Registration"; // Тут можна передати потрібний заголовок
//   //for title=================

//   return (
//     <div className="default-container">
//       {/* title ідентичний для всіх сторінок */}
//       <TitleComponent pageTitle={pageTitle} />
//       <h4 className="text-under-title">Choose a registration method</h4>
//       <form onSubmit={handleSignup}>
//         <div className="input_field-container">
//           <label>Email</label>
//           <input
//             className="input_field"
//             type="email"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Введіть email"
//             required
//           />
//           <label>Password</label>
//           <PasswordInput
//             value={password}
//             placeholder="Створіть пароль"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div className="button-container">
//           <h4>
//             Already have an account? <Link to="/signin">Sign In</Link>
//           </h4>
//           <button type="submit" className="continue-button">
//             Continue
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SignupPage;

// 1 Файл SignupPage.js Date 03.06.2024
// import React, { useState, useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { AuthContext } from "../../AuthContext";
// import { registerUser } from "../../AuthActions";
// import Swal from "sweetalert2"; // Import SweetAlert2
// import PasswordInput from "../../component/PasswordInput";
// import TitleComponent from "../../component/TitleComponent";
// import "./style.css";

// export const SignupPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const { dispatch, users } = useContext(AuthContext);

//   const handleSignup = async (event) => {
//     event.preventDefault();

//     console.log("Attempting to register user with email:", email);

//     const userExists =
//       users && users.some((user) => user && user.email === email);
//     if (userExists) {
//       Swal.fire({
//         title: "Error",
//         text: "Користувач з такою електронною поштою вже існує.",
//         icon: "error",
//         customClass: {
//           popup: "custom-swal-popup", // Add custom class for styling
//           content: "custom-swal-content", // Add custom class for styling
//         },
//       });
//       return;
//     }

//     const registrationResult = registerUser(
//       email,
//       password,
//       dispatch //add 15.06.24-13:10
//     );

//     if (registrationResult.success) {
//       dispatch({
//         type: "LOGIN",
//         payload: { token: "temporary_token", user: registrationResult.user },
//       });

//       // Show the registration success message with recovery code
//       Swal.fire({
//         title: "Registration Successful",
//         html: `<div>
//                <p>Your registration was successful. Your confirmation code: <strong id="confirmationCode">${registrationResult.user.confirmationCode}</strong></p>
//              </div>`,
//         showConfirmButton: true, // Show the confirm button
//         confirmButtonText: "Copy Code", // Set the button text
//         willOpen: () => {
//           document
//             .querySelector(".swal2-confirm")
//             .addEventListener("click", () => {
//               navigator.clipboard
//                 .writeText(registrationResult.user.confirmationCode)
//                 .then(() => {
//                   Swal.fire({
//                     title: "Copied!",
//                     text: "The confirmation code has been copied to the clipboard.",
//                     icon: "success",
//                     timer: 2000, // Show message for 2 seconds
//                     showConfirmButton: false, // Do not show confirm button
//                     position: "top-end", // Position the message at the top right corner
//                     toast: true, // Show the message as a toast
//                     customClass: {
//                       container: "swal2-toast-container", // Add custom class for container
//                       popup: "swal2-toast", // Add custom class for popup
//                     },
//                   });
//                 })
//                 .catch((err) => {
//                   console.error("Failed to copy text: ", err);
//                 });
//             });
//         },
//         willClose: () => {
//           // Navigate to the next page after SweetAlert is closed
//           navigate("/signup-confirm");
//         },
//         customClass: {
//           popup: "custom-swal-popup", // Add custom class for styling
//           content: "custom-swal-content", // Add custom class for styling
//         },
//       });
//     } else {
//       Swal.fire({
//         title: "Error",
//         text: registrationResult.message,
//         icon: "error",
//         customClass: {
//           popup: "custom-swal-popup", // Add custom class for styling
//           content: "custom-swal-content", // Add custom class for styling
//         },
//       });
//     }
//   };

//   const pageTitle = "Registration"; // Set the page title

//   return (
//     <div className="default-container">
//       {/* title ідентичний для всіх сторінок */}
//       <TitleComponent pageTitle={pageTitle} />
//       <h4 className="text-under-title">Choose a registration method</h4>
//       <form onSubmit={handleSignup}>
//         <div className="input_field-container">
//           <label>Email</label>
//           <input
//             className="input_field"
//             type="email"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Введіть email"
//             required
//           />
//           <label>Password</label>
//           <PasswordInput
//             value={password}
//             placeholder="Створіть пароль"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div className="button-container">
//           <h4>
//             Already have an account? <Link to="/signin">Sign In</Link>
//           </h4>
//           <button type="submit" className="continue-button">
//             Continue
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SignupPage;

// 1 Файл SignupPage.js Date 03.06.2024
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { registerUser } from "../../AuthActions";
import Swal from "sweetalert2"; // Import SweetAlert2
import PasswordInput from "../../component/PasswordInput";
import TitleComponent from "../../component/TitleComponent";
import "./style.css";

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(""); // Add state to handle email error
  const [passwordError, setPasswordError] = useState(""); // Add state to handle password error
  const navigate = useNavigate();
  const { dispatch, users } = useContext(AuthContext);

  const handleSignup = async (event) => {
    event.preventDefault();

    console.log("Attempting to register user with email:", email);

    // Reset errors
    setEmailError("");
    setPasswordError("");

    const userExists =
      users && users.some((user) => user && user.email === email);
    if (userExists) {
      setEmailError("Користувач з такою електронною поштою вже існує.");
      return;
    }

    const registrationResult = await registerUser(email, password, dispatch);

    if (registrationResult.success) {
      // Do not dispatch login here, instead navigate to /signup-confirm
      Swal.fire({
        title: "Registration Successful",
        html: `<div>
               <p>Your registration was successful. Your confirmation code: <strong id="confirmationCode">${registrationResult.user.confirmationCode}</strong></p>
             </div>`,
        showConfirmButton: true,
        confirmButtonText: "Copy Code",
        willOpen: () => {
          document
            .querySelector(".swal2-confirm")
            .addEventListener("click", () => {
              navigator.clipboard
                .writeText(registrationResult.user.confirmationCode)
                .then(() => {
                  Swal.fire({
                    title: "Copied!",
                    text: "The confirmation code has been copied to the clipboard.",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                    position: "top-end",
                    toast: true,
                    customClass: {
                      container: "swal2-toast-container",
                      popup: "swal2-toast",
                    },
                  });
                })
                .catch((err) => {
                  console.error("Failed to copy text: ", err);
                });
            });
        },
        willClose: () => {
          // Dispatch login and navigate to /signup-confirm
          dispatch({
            type: "LOGIN",
            payload: {
              token: "temporary_token",
              user: registrationResult.user,
            },
          });

          navigate("/signup-confirm", {
            state: {
              email,
              confirmationCode: registrationResult.user.confirmationCode,
            },
          });
        },
        customClass: {
          popup: "custom-swal-popup",
          content: "custom-swal-content",
        },
      });
    } else {
      setPasswordError(registrationResult.message);
    }
  };

  const pageTitle = "Registration";

  return (
    <div className="default-container">
      {/* title ідентичний для всіх сторінок */}
      <TitleComponent pageTitle={pageTitle} />
      <h4 className="text-under-title">Choose a registration method</h4>
      <form onSubmit={handleSignup}>
        <div className="input_field-container">
          <label>Email</label>
          <input
            className="input_field"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введіть email"
            required
          />
          <label>Password</label>
          <PasswordInput
            value={password}
            placeholder="Створіть пароль"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
          <h4>
            Already have an account? <Link to="/signin">Sign In</Link>
          </h4>
          <button type="submit" className="continue-button">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
