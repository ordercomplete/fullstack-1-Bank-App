import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function WellcomePage() {
  const { dispatch } = useContext(AuthContext);

  return (
    <div
      style={{
        width: "393px",
        height: "852px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(180deg, #6E57FF 0%, rgba(255, 255, 255, 0) 100%), #F6F6F6",
        color: "white",
      }}
    >
      <h1>Hello!</h1>
      <p>Wellcome to bank app</p>
      <img src="/path/to/your/image.png" alt="Wellcome" />
      <div style={{ marginTop: "auto", marginBottom: "50px" }}>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "white",
            borderRadius: "20px",
            color: "#333",
            textDecoration: "none",
            marginRight: "10px",
          }}
          onClick={() =>
            dispatch({
              type: "LOGIN",
              payload: { user: "Username", token: "token1234" },
            })
          }
        >
          Sign In
        </button>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "white",
            borderRadius: "20px",
            color: "#333",
            textDecoration: "none",
          }}
          onClick={() => dispatch({ type: "LOGOUT" })}
        >
          Sign Out
        </button>

        <Link
          to="/signup"
          style={{
            padding: "10px 20px",
            backgroundColor: "lime",
            borderRadius: "20px",
            color: "#333",
            textDecoration: "none",
            margin: "10px",
          }}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default WellcomePage;
