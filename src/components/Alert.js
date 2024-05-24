import React, { createContext, useState, useContext } from 'react';

// Create the context
const NotificationsContext = createContext();

// Custom hook to use the notifications context
export const useNotifications = () => useContext(NotificationsContext);

// Provider component to wrap around the app
export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
   
  ]);

  const addNotification = (title, message) => {
    const newNotification = {
      id: notifications.length + 1,
      title,
      message,
      time: 'Just now', // This could be more dynamic in a real-world app
    };
    setNotifications([newNotification, ...notifications]);
  };

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationsContext.Provider>
  );
};