import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './user';


const Hostel = ({ hostel }) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const handleBookNow = () => {
    if (!currentUser) {
      navigate('/Login'); // Use navigate directly instead of returning JSX
    } else {
      navigate('/BookingPage', { state: { hostel } });
    }
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="hostel shadow-lg rounded-lg overflow-hidden bg-white">
      <img src={hostel.image} alt={hostel.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{hostel.name}</h2>
        {showDetails && (
          <div className="mt-2">
            <p className="text-gray-600">Rent: {hostel.rent}</p>
            <p className="text-gray-600">Date Uploaded: {hostel.dateUploaded}</p>
            <p className="text-gray-600">Distance from Campus: {hostel.distance} km</p>
            <p className="text-gray-600">Rooms Available: {hostel.roomsAvailable}</p>
            <p className="text-gray-600">Gender: {hostel.gender}</p>
            <p className="text-gray-600">Landlord Contact: {hostel.landlord}</p>
          </div>
        )}
        <button onClick={toggleDetails} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-2 mr-2">
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>
        <button onClick={handleBookNow} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-2">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Hostel;