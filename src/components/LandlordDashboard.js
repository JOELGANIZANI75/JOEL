import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddHostelForm from './AddHostelForm.js';
import { useHostels } from './HostelContext';

const LandlordDashboard = () => {
  const [showAddHostelForm, setShowAddHostelForm] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const { hostels, addHostel, deleteHostel } = useHostels();
  const [loading, setLoading] = useState(false);

  const redirectToProfile = () => {
    navigate('/profile');
    setShowProfileDropdown(false);
  };

  const handleLogout = () => {
    // Perform logout logic here...
    navigate('/');
  };

  const handleDeleteHostel = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this hostel?');
    if (confirmDelete) {
      deleteHostel(index);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">Landlord Dashboard</h1>

        <div className="mb-4">
          <button
            onClick={() => setShowAddHostelForm(!showAddHostelForm)}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {showAddHostelForm ? 'Close Add Hostel Form' : 'Add Hostel'}
          </button>
        </div>

        {showAddHostelForm && (
          <div className="mb-4">
            <AddHostelForm />
          </div>
        )}

        <h2 className="text-2xl font-semibold mb-4">Your Hostels</h2>
        {loading ? (
          <p>Loading hostels...</p>
        ) : (
          <div className="space-y-4">
            {hostels.length > 0 ? (
              hostels.map((hostel, index) => (
                <div key={index} className="p-4 border rounded-md bg-gray-100">
                <p><strong>Hostel Name:</strong> {hostel.name}</p>
                <p><strong>Room Type:</strong> {hostel.roomType}</p>
                <p><strong>Amount of Rooms:</strong> {hostel.amountOfRooms}</p>
                <p><strong>Amount (MWK):</strong> {hostel.amount}</p>
                <p><strong>Directions to Campus:</strong> {hostel.distance}</p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {hostel.images && hostel.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${imgIndex + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  ))}
                </div>
                <button
                    onClick={() => handleDeleteHostel(index)}
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Delete Hostel
                  </button>
                </div>
              ))
            ) : (
              <p>No hostels added yet.</p>
            )}
          </div>
        )}

        <div className="mt-8 relative">
          <button
            onClick={redirectToProfile}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            My Profile
          </button>
          {showProfileDropdown && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <button className="block py-2 px-4 text-gray-800 hover:bg-gray-200 w-full text-left">My Profile</button>
              <hr className="border-gray-200" />
              <button onClick={handleLogout} className="block py-2 px-4 text-gray-800 hover:bg-gray-200 w-full text-left">Log Out</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandlordDashboard;
