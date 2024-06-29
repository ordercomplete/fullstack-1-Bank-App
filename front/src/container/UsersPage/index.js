// 1 Файл UsersPage.js
// import React, { useContext, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../AuthContext";

// export const UsersPage = () => {
//   const { user, users, dispatch } = useContext(AuthContext);

//   useEffect(() => {
//     // add useEffect + dispatch 15.06.24-12:55
//     // Load default users if no users exist in the context
//     if (!users.length) {
//       dispatch({
//         type: "LOAD_USERS",
//         payload: { users: [] }, // Empty array since initial users are now loaded from localStorage
//       });
//     }
//   }, [users, dispatch]); // Added users and dispatch as dependencies

//   const handleClearUsers = () => {
//     dispatch({ type: "CLEAR_USERS" });
//   };

//   return (
//     <div className="default-container">
//       <h2>Ви увійшли як {user ? `${user.email}` : "Guest"}</h2>
//       <Link to="/balance" className="nav_back-button">
//         Back
//       </Link>
//       <button onClick={handleClearUsers} className="clear-notifications-button">
//         Очистити список
//       </button>
//       <h1>Registered Users</h1>
//       <div>
//         {users.length > 0 ? (
//           users.map(
//             (
//               user //remove {user.name} 15.06.24-19:24
//             ) => (
//               <div key={user.id} className="user-item">
//                 {user.email}
//                 <Link to={`/user-data/${user.id}`} className="user-data-link">
//                   View Transactions
//                 </Link>
//               </div>
//             )
//           )
//         ) : (
//           <p>Немає зареєстрованих користувачів.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UsersPage;

// 2 Файл UsersPage.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { deleteUserAccount } from "../../AuthActions";
import TitleComponent from "../../component/TitleComponent";
import UsersBlock from "../../component/UsersBlock";
import "./style.css";

export const UsersPage = () => {
  const { users, user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = (userEmail) => {
    if (
      user.isAdmin &&
      window.confirm(`Are you sure you want to delete ${userEmail}?`)
    ) {
      deleteUserAccount(userEmail, dispatch);
    } else {
      alert("You don't have permission to delete this account.");
    }
  };

  const handleViewUserData = (userId) => {
    navigate(`/user-data/${userId}`);
  };

  //for title=================
  // Replace with actual authentication state
  // const isAuthenticated = true; //user.email знайти підтвердження авторизації від системи
  // Якщо у вас вже є змінна, що містить різні назви для сторінок
  const pageTitle = "Users"; // Тут можна передати потрібний заголовок
  //for title=================

  return (
    <div className="default-container-auth jost-font-text">
      {/* title ідентичний для всіх сторінок */}
      <TitleComponent pageTitle={pageTitle} />
      {/* <h1>Users</h1> */}
      <div className="user-data-list">
        {users.map((u) => (
          <div key={u.id} className="user-data-item">
            <div className="user-data">
              <strong>Email:</strong> {u.email}
              <br />
              <strong>Confirmed:</strong> {u.confirmed ? "Yes" : "No"}
              <br />
              <strong>Admin:</strong> {u.isAdmin ? "Yes" : "No"}
            </div>
            <div className="user-actions">
              <button
                onClick={() => handleViewUserData(u.id)}
                className="user-transactions-button"
              >
                Транзакції {u.email}
              </button>
              {user.isAdmin && (
                <button
                  onClick={() => handleDelete(u.email)}
                  className="user-delete-button"
                >
                  Delete Account
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <UsersBlock user={user} />
      {/* {user && user.isAdmin ? <UsersBlock user={user} /> : null} */}
    </div>
  );
};

export default UsersPage;
