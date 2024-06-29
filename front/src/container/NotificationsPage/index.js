//Файл NotificationsPage.js Date 31.05.2024
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import UsersBlock from "../../component/UsersBlock";
import TitleComponent from "../../component/TitleComponent";
import "./style.css";

// import * as eventIcon from "/eventIcon";
// import * as loginIcon from "/loginIcon"; // Import the logo for transaction events (or other logos as necessary)

export const NotificationsPage = () => {
  const { user, transactions, events } = useContext(AuthContext);
  const [allEvents, setAllEvents] = useState([]);
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    let combinedEvents = [];

    // Filter transactions for the current user
    const userTransactions = transactions.filter(
      (trans) =>
        (trans.from === user.email && trans.type === "send") ||
        (trans.to === user.email && trans.type === "receive")
    );

    userTransactions.forEach((trans) => {
      combinedEvents.push({
        title: trans.type === "send" ? "Переказ" : "Поповнення",
        info: `${
          trans.from === user.email
            ? `Кому: ${trans.to}; Від: ${user.email} `
            : `Кому: ${user.email}; Від: ${trans.from} `
        }, ${trans.type === "receive" ? "+" : "-"}$${trans.amount}, ${new Date(
          trans.time
        ).toLocaleString()}`,
        time: new Date(trans.time),
        type: "transaction", // Added for icon logic
      });
    });

    // Фільтруємо події користувача для використання в нотифікаціях 21.06.24-01:01 ???

    // Додати загальні події до списку add 21.06.24-11:15
    if (Array.isArray(events)) {
      combinedEvents = [
        ...combinedEvents,
        ...events
          .filter(
            (event) => event.user === user.email || user.isAdmin
            // Filter events for the current user or admin
          )
          .map((event) => ({
            ...event,
            time: new Date(event.time),
            type: "userEvent", // Added for icon logic
          })),
      ];
    } else if (typeof events === "object") {
      combinedEvents = [
        ...combinedEvents,
        ...Object.values(events)
          .filter(
            (event) => event.user === user.email || user.isAdmin // Filter events for the current user or admin
          )
          .map((event) => ({
            ...event,
            time: new Date(event.time),
            type: "userEvent", // Added for icon logic
          })),
      ];
    }

    // Сортувати події за часом (спочатку останні)
    combinedEvents.sort((a, b) => new Date(b.time) - new Date(a.time));

    setAllEvents(combinedEvents);

    console.log("Combined events loaded and sorted:", combinedEvents);
  }, [user.email, transactions, events, user.isAdmin]);

  const handleClearNotifications = () => {
    dispatch({ type: "CLEAR_EVENTS" });
  };
  //for title=================
  // Replace with actual authentication state
  const isAuthenticated = true;
  // Якщо у вас вже є змінна, що містить різні назви для сторінок
  const pageTitle = "Notifications"; // Тут можна передати потрібний заголовок
  //for title=================

  return (
    <div className="notifications-default-container">
      {user && user.isAdmin ? <UsersBlock user={user} /> : null}
      {/* title ідентичний для всіх сторінок */}
      <TitleComponent pageTitle={pageTitle} isAuthenticated={isAuthenticated} />

      <p>Нотифікації</p>
      <div className="notifications-container">
        {allEvents.length > 0 ? (
          allEvents.map((event, index) => (
            <div
              key={index}
              className={`notification-item notification-${event.type}`}
            >
              {/* Event logo */}
              <div className="notification-logo">
                <img
                  src={`/eventIcons/${
                    event.type === "transaction"
                      ? "event.svg"
                      : "event-warn.svg"
                  }`}
                  alt="Event logo"
                />
              </div>
              {/* Event details with individual styles */}
              <div className="notification-details">
                <h3 className="notification-title">{event.title}</h3>
                <h4 className="notification-info">{event.info}</h4>
              </div>
            </div>
          ))
        ) : (
          <p>Нотифікації відсутні.</p>
        )}
      </div>
      <button onClick={handleClearNotifications} className="clear-button">
        Очистити нотифікації
      </button>
    </div>
  );
};

export default NotificationsPage;
