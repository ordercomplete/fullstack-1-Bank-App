//1  Файл NotificationsPage.js
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

export const NotificationsPage = () => {
  const { transactions, events } = useContext(AuthContext);
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    let combinedEvents = [];

    // Додавання подій транзакцій
    transactions.forEach((trans) => {
      combinedEvents.push({
        title: trans.type === "receive" ? "Поповнення" : "Переказ",
        info: `${trans.userName}, ${trans.amount}, ${new Date(
          trans.time
        ).toLocaleString()}`,
      });
    });

    // Додавання загальних подій
    if (Array.isArray(events)) {
      combinedEvents = [...combinedEvents, ...events];
    } else if (typeof events === "object") {
      // Якщо events є об'єктом, тоді перетворюємо його на масив
      combinedEvents = [...combinedEvents, ...Object.values(events)];
    }

    setAllEvents(combinedEvents);
  }, [transactions, events]);

  return (
    <div className="default-container">
      <Link to="/balance" className="nav_back-button">
        Назад
      </Link>
      <div
        className="notifications-container"
        style={{
          overflowY: "auto",
          maxHeight: "80vh",
          padding: "10px",
          marginTop: "20px",
        }}
      >
        <h1>Нотифікації</h1>
        {allEvents.length > 0 ? (
          allEvents.map((event, index) => (
            <div
              key={index}
              className="notification-item"
              style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}
            >
              <h3>{event.title}</h3>
              <p>{event.info}</p>
            </div>
          ))
        ) : (
          <p>Нотифікації відсутні.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
