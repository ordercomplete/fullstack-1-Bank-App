import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

function BalancePage() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Your Balance</h1>
      <p>
        <b>Amount:</b> {user.balance || "Loading..."}
      </p>
    </div>
  );
}

export default BalancePage;
