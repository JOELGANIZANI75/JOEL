import React, { useState, useEffect } from 'react';
import { useUser } from './user';

const AdminDashboard = () => {
  const { users, deleteUser } = useUser();
  const [adminCount, setAdminCount] = useState(0);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Count the number of admin accounts
  useEffect(() => {
    if (users && users.length > 0) {
      const adminAccounts = users.filter(user => user.accountType === 'Admin');
      setAdminCount(adminAccounts.length);
    }
  }, [users]);

  const handleDeleteUser = (userToDelete) => {
    deleteUser(userToDelete);
  };

  const redirectToProfile = () => {
    // Implement profile redirection logic here...
    setShowProfileDropdown(false); // Close the profile dropdown after redirection
  };

  const handleLogout = () => {
    // Implement logout logic here...
    // Redirect to the home page or login page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1>

        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        {users && users.length > 0 ? (
          <div className="space-y-4">
            {users.map(user => (
              <div key={user.id} className="p-4 border rounded-md bg-gray-100">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <button
                  onClick={() => handleDeleteUser(user)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
                >
                  Delete User
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No users found.</p>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">Admin Accounts</h2>
          <p>Number of admin accounts: {adminCount}</p>
          {/* Add functionality to limit the creation of admin accounts if needed */}
        </div>

        <div className="mt-8 relative">
          <button
            onClick={redirectToProfile} // Call redirectToProfile function on button click
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            My Profile
          </button>
          {showProfileDropdown && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <button className="block py-2 px-4 text-gray-800 hover:bg-gray-200 w-full text-left">My Profile</button>
              <button onClick={handleLogout} className="block py-2 px-4 text-gray-800 hover:bg-gray-200 w-full text-left">Log Out</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
