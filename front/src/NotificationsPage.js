import React, { useEffect, useState } from "react";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Логіка завантаження нотифікацій
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    // Заглушка для виклику API
    setNotifications([
      { id: 1, message: "Successfully logged in." },
      { id: 2, message: "Your balance was updated." },
    ]);
  };

  return (
    <div>
      <h1>Notifications</h1>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationsPage;
