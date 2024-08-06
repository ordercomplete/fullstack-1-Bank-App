// 1 Файл RecoveryConfirmPage
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { updatePassword } from "../../AuthActions";
import { NavigationLink } from "../../component/NavigationLink";
import PasswordInput from "../../component/PasswordInput";
import TitleComponent from "../../component/TitleComponent";

export const RecoveryConfirmPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, code } = location.state; // Getting data from RecoveryPage
  const { users, dispatch } = useContext(AuthContext); // add dispatch 16.06.24-22:38

  const user = users.find((user) => user.email === email); // Find the user

  const [recoveryCode, setRecoveryCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  if (!user) {
    alert("User not found");
    console.log("Recovery Confirm Page: User not found", email);
    return null; // Return null to avoid rendering the page
  }

  console.log("Selected user for recovery:", user);

  const handleRestore = (event) => {
    event.preventDefault();
    // const { recoveryCode, newPassword } = event.target.elements; //прибрали на перевірку 29.06.24

    if (recoveryCode === code) {
      // видалили value з if (recoveryCode.value === code) 29.06.24
      // Call the method to update the password
      const updateResponse = updatePassword(email, newPassword, dispatch); // видалили value з newPassword.value 29.06.24

      if (updateResponse.success) {
        console.log(`Password for ${email} changed successfully.`);
        navigate("/signin"); // Redirect to sign in page
      } else {
        console.log(updateResponse.message); // Show the error message
      }
    } else {
      console.log("Incorrect verification code. Please try again.");
    }
  };

  // Якщо у вас вже є змінна, що містить різні назви для сторінок
  const pageTitle = "Settings"; // Тут можна передати потрібний заголовок
  //for title=================

  return (
    <div className="default-container">
      {/* <div>
        <button onClick={() => navigate(-1)} className="nav_back-button">
          Назад
        </button>
        <NavigationLink isAuthenticated={Boolean()} />
      </div> */}
      <TitleComponent pageTitle={pageTitle} />
      <h4 className="text-under-title">Write the code you received</h4>
      <form onSubmit={handleRestore}>
        <div className="input_field-container">
          {/* <input
            className="input_field"
            name="recoveryCode"
            placeholder="Enter Code"
            required
          /> */}
          <PasswordInput
            // name="recoveryCode"
            // type="text"
            // placeholder="Enter Code"
            name="recoveryCode"
            value={recoveryCode}
            onChange={(e) => setRecoveryCode(e.target.value)} // Add onChange handler
            placeholder="Enter Code"
          />

          {/* <input
            className="input_field"
            name="newPassword"
            type="password"
            placeholder="New Password"
            required
          /> */}
          <PasswordInput
            // name="newPassword"
            // placeholder="New Password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)} // Add onChange handler
            placeholder="New Password"
          />
        </div>
        <button type="submit" className="continue-button">
          Restore Password
        </button>
      </form>
    </div>
  );
};

export default RecoveryConfirmPage;
