import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './user';

const Hostel = ({ hostel }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser, isLoading } = useUser();

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading]);

  const handleBookNow = () => {
    if (!currentUser) {
      navigate('/Login');
    } else {
      const confirmBooking = window.confirm('Are you sure you want to book this hostel?');
      if (confirmBooking) {
        navigate('/BookingPage', { state: { hostel } });
      }
    }
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="hostel shadow-lg rounded-lg overflow-hidden bg-white">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <img
            src={(hostel.images && hostel.images.length > 0) ? hostel.images[0] : '/fallback-image.jpg'}
            alt={hostel.name}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold">{hostel.name}</h2>
            {showDetails && (
              <div className="mt-2">
             <p>Rent: {hostel.rent}</p>
             <p>Room Type: {hostel.roomType}</p>
            <p>Distance: {hostel.distance} km</p>
            <p>Rooms Available: {hostel.roomsAvailable}</p>
            <p>Gender: {hostel.gender}</p>
            
            {/* Add more details as needed */}
              </div>
            )}
            <button onClick={toggleDetails} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-2 mr-2">
              {showDetails ? 'Hide Details' : 'View Details'}
            </button>
            <button onClick={handleBookNow} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-2">
              Book Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Hostel;
