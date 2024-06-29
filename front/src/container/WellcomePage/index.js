//Файл WellcomePage
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../WellcomePage/style.css";
import { AuthContext } from "../../AuthContext";

function WellcomePage() {
  const { dispatch } = useContext(AuthContext);

  const handleClearUsers = () => {
    dispatch({ type: "CLEAR_USERS" });
  };
  return (
    <div className="welcome-container jost-font-text">
      <div className="welcome-image">
        <img src="/bitcoin-bank.png" alt="Вітаємо" />
      </div>
      <div className="welcome-background-container">
        <div className="Status-Bar-Box">
          {/* <img
            className="Status-Bar"
            src="svg/Status-Bar-White.svg"
            alt="icon-enter"
          /> */}
        </div>
        <div className="welcome-heading-block">
          <div className="hello-text">Hello!</div>
          <h2 className="welcome-text">Welcome to bank app</h2>
        </div>
      </div>
      <div className="wellcome-button-container">
        <Link to="/signup" className="register-button">
          Sign Up
        </Link>
        <Link to="/signin" className="login-button">
          Sign In
        </Link>
        <button onClick={handleClearUsers} className="clear-button">
          Очистити список
        </button>
      </div>
    </div>
  );
}

export default WellcomePage;
