// 1 Файл UsersPage
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { usersDatabase } from "../../AuthActions";

export const UsersPage = () => {
  const { users, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (!users.length) {
      dispatch({
        type: "LOAD_USERS",
        payload: { users: usersDatabase },
      });
    }
  }, [users, dispatch]);

  return (
    <div className="default-container">
      <Link to="/balance" className="nav_back-button">
        Back
      </Link>
      <h1>Registered Users</h1>
      <div>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} class="user-item">
              {user.email}
            </div>
          ))
        ) : (
          <p>Немає зареєстрованих користувачів.</p>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
