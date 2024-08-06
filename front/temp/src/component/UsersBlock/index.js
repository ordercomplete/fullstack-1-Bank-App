import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export const UsersBlock = ({ user }) => {
  return (
    <div className="users-block">
      <h4 className="current-user">
        <span>
          <img
            className="icon-enter"
            src="loginIcons/log-in_black.svg"
            alt="icon-enter"
          />
        </span>
        <span> </span>
        <span>{user ? `${user.email}` : "Guest"}</span>
      </h4>
      <h4 className="userslist">
        {user && user.email === "admin@admin" && user.isAdmin && (
          <Link to="/users" className="users-icon-link">
            <img
              className="icon-enter"
              src="loginIcons/users_black.svg"
              alt="icon-enter"
            />
          </Link>
        )}
      </h4>
    </div>
  );
};

export default UsersBlock;
