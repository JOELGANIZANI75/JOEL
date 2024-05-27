import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import AddHostelForm from './AddHostelForm.js'; // Import the AddHostelForm component
import { useDataStore } from './datastore.js'; // Import the data store

const LandlordDashboard = () => {
  const [showAddHostelForm, setShowAddHostelForm] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook
  // Importing the arrays and their setters from the data store
  const {
    hostelNames, setHostelNames,
    roomTypes, setRoomTypes,
    amountsOfRooms, setAmountsOfRooms,
    amounts, setAmounts,
    distances, setDistances,
    imagesList, setImagesList,
  } = useDataStore();

  const handleDeleteHostel = (index) => {
    // Function to delete a hostel by index
    setHostelNames(hostelNames.filter((_, i) => i !== index));
    setRoomTypes(roomTypes.filter((_, i) => i !== index));
    setAmountsOfRooms(amountsOfRooms.filter((_, i) => i !== index));
    setAmounts(amounts.filter((_, i) => i !== index));
    setDistances(distances.filter((_, i) => i !== index));
    setImagesList(imagesList.filter((_, i) => i !== index));
  };

  const redirectToProfile = () => {
    navigate('/profile'); // Redirect to the profile page
    setShowProfileDropdown(false); // Close the profile dropdown after redirection
  };

  const handleLogout = () => {
    // Function to handle logout
    // Perform logout logic here...
    navigate('/'); // Redirect to the home page
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
        <div className="space-y-4">
          {hostelNames.length > 0 ? (
            hostelNames.map((hostelName, index) => (
              <div key={index} className="p-4 border rounded-md bg-gray-100">
                <p><strong>Hostel Name:</strong> {hostelName}</p>
                <p><strong>Room Type:</strong> {roomTypes[index]}</p>
                <p><strong>Amount of Rooms:</strong> {amountsOfRooms[index]}</p>
                <p><strong>Amount (MWK):</strong> {amounts[index]}</p>
                <p><strong>Directions to Campus:</strong> {distances[index]}</p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {imagesList[index] && imagesList[index].map((image, imgIndex) => (
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
      
export default LandlordDashboard;
