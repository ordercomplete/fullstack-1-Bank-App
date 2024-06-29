//Файл PasswordInput
// import React, { useState } from "react";
// import "./style.css";

// export const PasswordInput = ({ value, onChange, placeholder }) => {
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword((prevState) => !prevState);
//   };

//   return (
//     <div className="password-input-container">
//       <input
//         className="input_field"
//         type={showPassword ? "text" : "password"}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         required
//       />
//       <button
//         type="button"
//         className={`password-visibility-button ${showPassword ? "active" : ""}`}
//         onClick={togglePasswordVisibility}
//       >
//         {showPassword ? "🙈" : "👁️‍🗨️"}
//       </button>
//     </div>
//   );
// };
// export default PasswordInput;

//Файл PasswordInput
// import React, { useState } from "react";
// import "./style.css";

// export const PasswordInput = ({
//   name,
//   value,
//   onChange,
//   placeholder,
//   type = "password",
// }) => {
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword((prevState) => !prevState);
//   };

//   return (
//     <div className="password-input-container">
//       <input
//         className="input_field"
//         type={showPassword && type === "password" ? "text" : type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         required
//       />
//       {type === "password" && (
//         <button
//           type="button"
//           className={`password-visibility-button ${
//             showPassword ? "active" : ""
//           }`}
//           onClick={togglePasswordVisibility}
//         >
//           {showPassword ? "🙈" : "👁️‍🗨️"}
//         </button>
//       )}
//     </div>
//   );
// };

// export default PasswordInput;

//Файл PasswordInput
import React, { useState } from "react";
import "./style.css";

const PasswordInput = ({
  name,
  value,
  onChange,
  placeholder,
  type = "password",
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isTemporarilyVisible, setIsTemporarilyVisible] = useState(false);
  const [timer, setTimer] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = (e) => {
    if (type === "password") {
      // Очистка попереднього таймера, якщо він існує
      if (timer) {
        clearTimeout(timer);
      }

      // Тимчасове відображення символів
      setIsTemporarilyVisible(true);
      setTimer(
        setTimeout(() => {
          setIsTemporarilyVisible(false);
        }, 2000)
      );
    }
    onChange(e);
  };

  return (
    <div className="password-input-container">
      <input
        className={`input_field ${className}`}
        type={showPassword || isTemporarilyVisible ? "text" : type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required
      />
      {type === "password" && (
        <button
          type="button"
          className={`password-visibility-button ${
            showPassword ? "active" : ""
          }`}
          onClick={togglePasswordVisibility}
        >
          {showPassword ? "🙈" : "👁️‍🗨️"}
        </button>
      )}
    </div>
  );
};

export default PasswordInput;
