import React, { useState, useEffect } from 'react';
import { useUser } from './user';
import { useNavigate } from 'react-router-dom';
import ConfirmationDialog from './ConfirmationDialog';

const AdminDashboard = () => {
  const { users, deleteUser } = useUser();
  const [adminCount, setAdminCount] = useState(0);
  const [showAllUsers, setShowAllUsers] = useState(true);
  const [showLandlords, setShowLandlords] = useState(false);
  const [showStudents, setShowStudents] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState('All');
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, user: null });

  // Prevent user from going back to login page using browser's back button after login
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      navigate('/Admin'); // Redirect back to the landlord dashboard
    };
    window.history.pushState(null, '', window.location.pathname); // Clear browser history
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  // Count the number of admin accounts
  useEffect(() => {
    if (users && users.length > 0) {
      const adminAccounts = users.filter(user => user.accountType === 'Admin');
      setAdminCount(adminAccounts.length);
    }
  }, [users]);

  const handleDeleteUser = (userToDelete) => {
    deleteUser(userToDelete);
    setDeleteConfirmation({ isOpen: false, user: null });
  };

  const handleDeleteConfirmation = (user) => {
    setDeleteConfirmation({ isOpen: true, user });
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, user: null });
  };

  const redirectToProfile = () => {
    navigate('/AdminProfile');
    setShowProfileDropdown(false);
  };

  const handleLogout = () => {
    // Implement logout logic here...
    // Redirect to the home page or login page
    navigate('/login'); // Redirect to the login page after logout
  };

  const filteredUsers = selectedAccountType === 'All' ? users : users.filter(user => user.accountType === selectedAccountType);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1>

        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => {setShowAllUsers(true); setShowLandlords(false); setShowStudents(false); setSelectedAccountType('All')}}
            className={`py-2 px-4 rounded-md transition duration-300 ${showAllUsers ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'}`}
          >
            All Users
          </button>
          <button
            onClick={() => {setShowAllUsers(false); setShowLandlords(true); setShowStudents(false); setSelectedAccountType('Landlord')}}
            className={`py-2 px-4 rounded-md transition duration-300 ${showLandlords ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'}`}
          >
            Landlords
          </button>
          <button
            onClick={() => {setShowAllUsers(false); setShowLandlords(false); setShowStudents(true); setSelectedAccountType('Student')}}
            className={`py-2 px-4 rounded-md transition duration-300 ${showStudents ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'}`}
          >
            Students
          </button>
        </div>

        {(showAllUsers || showLandlords || showStudents) && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Users</h2>
            {filteredUsers && filteredUsers.length > 0 ? (
              <div className="space-y-4">
                {filteredUsers.map(user => (
                  <div key={user.id} className="p-4 border rounded-md bg-gray-100">
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Account Type:</strong> {user.accountType}</p>
                    {/* Add other details specific to Landlords and Students if any */}
                    <button
                      onClick={() => handleDeleteConfirmation(user)}
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
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">Admin Accounts</h2>
          <p>Number of admin accounts: {adminCount}</p>
          {/* Add functionality to limit the creation of admin accounts if needed */}
        </div>

        <div className="mt-8 relative">
          <button
            onClick={redirectToProfile}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            My Profile
          </button>
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
          {showProfileDropdown && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <button className="block py-2 px-4 text-gray-800 hover:bg-gray-200 w-full text-left">My Profile</button>
              <hr className="border-gray-200" />
              <button onClick={handleLogout} className="block py-2 px-4 text-gray-800 hover:bg-gray-200 w-full text-left">Log Out</button>
            </div>
          )}
        </div>

      
        <ConfirmationDialog
          isOpen={deleteConfirmation.isOpen}
          user={deleteConfirmation.user}
          onDelete={handleDeleteUser}
          onCancel={handleCancelDelete}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
