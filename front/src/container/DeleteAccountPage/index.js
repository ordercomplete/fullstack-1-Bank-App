// Файл DeleteAccountPage.js
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { deleteAccount } from "../../AuthActions"; // Припустимо, ви додали функцію deleteAccount

export const DeleteAccountPage = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [error, setError] = useState("");

  const handleDelete = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;

    const deleteResponse = deleteAccount(email.value, password.value);

    if (deleteResponse.success) {
      dispatch({
        type: "LOGOUT",
      });
      alert("Акаунт успішно видалено.");
      navigate("/"); // Переадресація на головну сторінку
    } else {
      setError(deleteResponse.message);
    }
  };

  return (
    <div className="default-container">
      <button onClick={() => navigate(-1)} className="nav_back-button">
        Назад
      </button>
      <h1>Видалення акаунту</h1>
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
          Видалити акаунт
        </button>
      </form>
    </div>
  );
};

export default DeleteAccountPage;
