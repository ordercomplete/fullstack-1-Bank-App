//Файл WellcomePage
import React from "react";
import { Link } from "react-router-dom";
import "../WellcomePage/style.css";
// import "../../index.css";

function WellcomePage() {
  return (
    <div className="welcome-container">
      <div className="welcome-image">
        <img src="/bitcoin-bank.png" alt="Вітаємо" />
      </div>
      <div className="background-container">
        <h1>Hello!</h1>
        <p>Ласкаво просимо до банківського додатку</p>
      </div>
      <div className="button-container">
        <Link to="/signup" className="register-button">
          Реєстрація
        </Link>
        <Link to="/signin" className="login-button">
          Вхід
        </Link>
      </div>
    </div>
  );
}

export default WellcomePage;
