// Файл RecoveryPage
// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../AuthContext";
// import { NavigationLink } from "../../component/NavigationLink";

// export const RecoveryPage = () => {
//   const navigate = useNavigate();
//   const { users } = useContext(AuthContext); // Extract users from AuthContext

//   const generateRecoveryCode = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
//   };

//   const handleRecovery = (event) => {
//     event.preventDefault();
//     const { email } = event.target.elements;
//     const code = generateRecoveryCode();
//     const user = users.find((user) => user.email === email.value);

//     if (!user) {
//       alert("User not found");
//       console.log("Recovery Page: User not found", email.value);
//       return;
//     }

//     console.log("Selected user for recovery:", user);

//     alert(
//       `Recovery code sent to your email: ${email.value}. Your code: ${code}`
//     );

//     navigate("/recovery-confirm", {
//       state: { email: email.value, code: code },
//     });
//   };

//   return (
//     <div className="default-container">
//       <div>
//         <button onClick={() => navigate(-1)} className="nav_back-button">
//           Назад
//         </button>
//         <NavigationLink isAuthenticated={Boolean()} />
//       </div>
//       <h4 className="text-under-title">Choose a recovery method</h4>
//       <form onSubmit={handleRecovery}>
//         <div className="input_field-container">
//           <input
//             className="input_field"
//             name="email"
//             type="email"
//             placeholder="Your Email"
//             required
//           />
//         </div>
//         <button type="submit" className="continue-button">
//           Send Code
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RecoveryPage;

// import React, { useContext, useState } from "react"; // Added useState
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../AuthContext";
// import Swal from "sweetalert2"; // Import SweetAlert2
// // import { NavigationLink } from "../../component/NavigationLink";
// import TitleComponent from "../../component/TitleComponent";

// export const RecoveryPage = () => {
//   const navigate = useNavigate();
//   const { users } = useContext(AuthContext); // Extract users from AuthContext

//   // New states for handling errors
//   const [email, setEmail] = useState("");
//   const [emailError, setEmailError] = useState("");

//   const generateRecoveryCode = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
//   };

//   const handleRecovery = (event) => {
//     event.preventDefault();
//     const { email } = event.target.elements;
//     const code = generateRecoveryCode();
//     const user = users.find((user) => user.email === email.value);

//     if (!user) {
//       setEmailError("User not found");
//       setEmail("");
//       console.log("Recovery Page: User not found", email.value);
//       return;
//     }

//     setEmailError(""); // Clear any previous errors
//     console.log("Selected user for recovery:", user);

//     alert(
//       `Recovery code sent to your email: ${email.value}. Your code: ${code}`
//     );

//     navigate("/recovery-confirm", {
//       state: { email: email.value, code: code },
//     });
//   };
//   // Якщо у вас вже є змінна, що містить різні назви для сторінок
//   const pageTitle = "Recover password"; // Тут можна передати потрібний заголовок
//   //for title=================

//   return (
//     <div className="default-container">
//       <TitleComponent pageTitle={pageTitle} />
//       <h4 className="text-under-title">Choose a recovery method</h4>
//       <form onSubmit={handleRecovery}>
//         <div className="input_field-container">
//           <label htmlFor="email" className="input_label">
//             Email
//           </label>
//           <input
//             className={`input_field ${emailError ? "error" : ""}`}
//             name="email"
//             type="email"
//             // placeholder="Your Email"
//             placeholder={emailError ? emailError : "Email"}
//             value={email}
//             onChange={(e) => {
//               setEmailError(""); // Clear error when user starts typing
//               setEmail(e.target.value);
//             }}
//             required
//           />
//           {/* {emailError && <span className="error-message">{emailError}</span>} */}
//           <button type="submit" className="continue-button">
//             Send Code
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default RecoveryPage;

// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2"; // Import SweetAlert2
// import { AuthContext } from "../../AuthContext";
// import TitleComponent from "../../component/TitleComponent";
// import "./style.css";

// export const RecoveryPage = () => {
//   const navigate = useNavigate();
//   const { users } = useContext(AuthContext);

//   const [email, setEmail] = useState("");
//   const [emailError, setEmailError] = useState("");

//   const generateRecoveryCode = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
//   };

//   const handleRecovery = (event) => {
//     event.preventDefault();
//     const { email } = event.target.elements;
//     const code = generateRecoveryCode();
//     const user = users.find((user) => user.email === email.value);

//     if (!user) {
//       setEmailError("User not found");
//       setEmail("");
//       console.log("Recovery Page: User not found", email.value);
//       return;
//     }

//     setEmailError("");
//     console.log("Selected user for recovery:", user);

//     Swal.fire({
//       title: "Recovery Code",
//       html: `<div class="swal2-window-confirm">
//         <p>Recovery code sent to your email: <strong>${email.value}</strong></p>
//         <p>Your code: <strong>${code}</strong></p>
//         <button id="copyCodeButton" class="swal2-confirm swal2-styled">Copy Code</button>
//         </div>`,
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Handle button click
//         const copyCodeButton = document.getElementById("copyCodeButton");
//         copyCodeButton.addEventListener("click", () => {
//           try {
//             navigator.clipboard.writeText(code);
//             Swal.fire({
//               title: "Copied!",
//               text: "The recovery code has been copied to the clipboard.",
//               icon: "success",
//               timer: 2000, // Показувати повідомлення протягом 2 секунд
//               showConfirmButton: false, // Не показувати кнопку підтвердження
//               position: "top-end", // Розташувати повідомлення у верхньому правому куті
//               toast: true, // Показувати повідомлення як тост
//               customClass: {
//                 container: "swal2-toast-container", // Додати власний клас для контейнера
//                 popup: "swal2-toast", // Додати власний клас для спливаючого вікна
//               },
//             });
//           } catch (err) {
//             console.error("Failed to copy text: ", err);
//           }
//         });
//       }

//       // Navigate to the next page after the SweetAlert is closed
//       navigate("/recovery-confirm", {
//         state: { email: email.value, code: code },
//       });
//     });
//   };

//   const pageTitle = "Recover password";

//   return (
//     <div className="default-container">
//       <TitleComponent pageTitle={pageTitle} />
//       <h4 className="text-under-title">Choose a recovery method</h4>
//       <form onSubmit={handleRecovery}>
//         <div className="input_field-container">
//           <label htmlFor="email" className="input_label">
//             Email
//           </label>
//           <input
//             className={`input_field ${emailError ? "error" : ""}`}
//             name="email"
//             type="email"
//             placeholder={emailError ? emailError : "Email"}
//             value={email}
//             onChange={(e) => {
//               setEmailError(""); // Clear error when user starts typing
//               setEmail(e.target.value);
//             }}
//             required
//           />
//           <button type="submit" className="continue-button">
//             Send Code
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default RecoveryPage;

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import { AuthContext } from "../../AuthContext";
import TitleComponent from "../../component/TitleComponent";
import "./style.css";

export const RecoveryPage = () => {
  const navigate = useNavigate();
  const { users } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const generateRecoveryCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleRecovery = (event) => {
    event.preventDefault();
    const { email } = event.target.elements;
    const code = generateRecoveryCode();
    const user = users.find((user) => user.email === email.value);

    if (!user) {
      setEmailError("User not found");
      setEmail("");
      console.log("Recovery Page: User not found", email.value);
      return;
    }

    setEmailError("");
    console.log("Selected user for recovery:", user);

    Swal.fire({
      title: "Recovery Code",
      html: `<div class="swal2-window-confirm">
               <p>Recovery code sent to your email: <strong>${email.value}</strong></p>
               <p>Your code: <strong id="recoveryCode">${code}</strong></p>
             </div>`,
      showConfirmButton: true, // Show the confirm button
      confirmButtonText: "Copy Code", // Set the button text
      willOpen: () => {
        // Create a clipboard function to copy the code to the clipboard
        document
          .querySelector(".swal2-confirm")
          .addEventListener("click", () => {
            navigator.clipboard
              .writeText(code)
              .then(() => {
                Swal.fire({
                  title: "Copied!",
                  text: "The recovery code has been copied to the clipboard.",
                  icon: "success",
                  timer: 3000, // Show message for 2 seconds
                  showConfirmButton: false, // Do not show confirm button
                  position: "top", // Position the message at the top right corner
                  toast: true, // Show the message as a toast
                  customClass: {
                    container: "swal2-toast-container", // Add custom class for container
                    popup: "swal2-toast", // Add custom class for popup
                  },
                });
              })
              .catch((err) => {
                console.error("Failed to copy text: ", err);
              });
          });
      },
      willClose: () => {
        // Navigate to the next page after SweetAlert is closed
        navigate("/recovery-confirm", {
          state: { email: email.value, code: code },
        });
      },
      customClass: {
        popup: "custom-swal-popup", // Add custom class for styling
        content: "custom-swal-content", // Add custom class for styling
      },
    });
  };

  const pageTitle = "Recover password";

  return (
    <div className="default-container">
      <TitleComponent pageTitle={pageTitle} />
      <h4 className="text-under-title">Choose a recovery method</h4>
      <form onSubmit={handleRecovery}>
        <div className="input_field-container">
          <label htmlFor="email" className="input_label">
            Email
          </label>
          <input
            className={`input_field ${emailError ? "error" : ""}`}
            name="email"
            type="email"
            placeholder={emailError ? emailError : "Email"}
            value={email}
            onChange={(e) => {
              setEmailError(""); // Clear error when user starts typing
              setEmail(e.target.value);
            }}
            required
          />
          <button type="submit" className="continue-button">
            Send Code
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecoveryPage;
