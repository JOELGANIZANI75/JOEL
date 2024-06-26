import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const INACTIVITY_TIMEOUT = 7 * 60 * 60 * 1000;

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
    console.log('Stored users:', storedUsers); // Debugging line

    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    const lastActiveTime = localStorage.getItem('lastActiveTime');
    const currentTime = new Date().getTime();

    if (storedUser && lastActiveTime && (currentTime - lastActiveTime < INACTIVITY_TIMEOUT)) {
      setCurrentUser(storedUser);
    } else {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('lastActiveTime');
    }
  }, []);

  useEffect(() => {
    const handleUserActivity = () => {
      localStorage.setItem('lastActiveTime', new Date().getTime().toString());
    };

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keypress', handleUserActivity);

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keypress', handleUserActivity);
    };
  }, []);

  const loginUser = (username, password) => {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('lastActiveTime', new Date().getTime().toString());
      return user;
    }
    return null;
  };

  const registerUser = (newUser) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const updateUser = (updatedUser) => {
    const updatedUsers = users.map(user => (user.username === updatedUser.username ? updatedUser : user));
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const deleteUser = (userToDelete) => {
    const updatedUsers = users.filter(user => user.username !== userToDelete.username);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.removeItem(`bookings_${userToDelete.id}`);
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('lastActiveTime');
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('lastActiveTime');
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, users, deleteUser, loginUser, registerUser, updateUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
