import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

function SettingsPage() {
  const { updateUser } = useContext(AuthContext);

  const handleLogout = () => {
    updateUser(null);
  };

  return (
    <div>
      <h1>Settings</h1>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default SettingsPage;
