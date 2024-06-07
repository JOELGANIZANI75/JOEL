import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './user';

const Hostel = ({ hostel }) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useUser();

  const handleBookNow = () => {
    if (!currentUser) {
      navigate('/Login');
    } else {
      navigate('/BookingPage', { state: { hostel } });
    }
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="hostel shadow-lg rounded-lg overflow-hidden bg-white">
      <img src={hostel.images[0]} alt={hostel.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{hostel.name}</h2>
        {showDetails && (
          <div className="mt-2">
            <p className="text-gray-600">Hostel Name: {hostel.name}</p>
            <p className="text-gray-600">Room Type: {hostel.roomType}</p>
            <p className="text-gray-600">Amount of Rooms: {hostel.amountofrooms}</p>
            <p className="text-gray-600">Amount (MWK): {hostel.amount}</p>
            <p className="text-gray-600">Directions to Campus: {hostel.distance}</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {hostel.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Hostel Image ${index + 1}`}
                  className="w-full h-24 object-cover"
                />
              ))}
            </div>
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
