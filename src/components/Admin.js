import React, { useState, useEffect } from 'react';
import { useUser } from './user';

const AdminDashboard = () => {
  const { users, deleteUser } = useUser();
  const [adminCount, setAdminCount] = useState(0);

  // Count the number of admin accounts
  useEffect(() => {
    const adminAccounts = users.filter(user => user.accountType === 'Admin');
    setAdminCount(adminAccounts.length);
  }, [users]);

  const handleDeleteUser = (userToDelete) => {
    deleteUser(userToDelete);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Users</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <span>{user.username}</span>
              <span>{user.email}</span>
              <button onClick={() => handleDeleteUser(user)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Landlords</h2>
        {/* Display list of landlords */}
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Admin Accounts</h2>
        <p>Number of admin accounts: {adminCount}</p>
        {/* Limit the creation of admin accounts */}
      </div>
    </div>
  );
};

export default AdminDashboard;