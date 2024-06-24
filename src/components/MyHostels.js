import React, { useState, useEffect } from 'react';
import LandlordNavbar from './LandloadNavbar';

import { useHostels } from './HostelContext';

const MyHostels = () => {
  
  
  const { hostels, deleteHostel } = useHostels();
  const [loading, setLoading] = useState(false);

  

    

  

  

  const handleDeleteHostel = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this hostel?');
    if (confirmDelete) {
      deleteHostel(index);
    }
  };

  return (
    <div>
<LandlordNavbar />
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-100 p-8">
      
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
     
       

          
          

        
        <h2 className="text-2xl font-semibold mb-4">Your Hostels</h2>
        {loading ? (
          <p>Loading hostels...</p>
        ) : (
          <div className="space-y-4">
            {hostels.length > 0 ? (
              hostels.map((hostel, index) => (
                <div key={index} className="p-4 border rounded-md bg-gray-100">
                  <p><strong>Hostel Name:</strong> {hostel.name}</p>
                  <p><strong>Gender:</strong> {hostel.gender}</p>
                  <p><strong>Room Type:</strong> {hostel.roomType}</p>
                  <p><strong>Rooms Available:</strong> {hostel.roomsAvailable}</p>
                  <p><strong>Rent (MWK):</strong> {hostel.rent}</p>
                  <p><strong>Distance from Campus:</strong> {hostel.distance}</p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {hostel.images && hostel.images.map((image, imgIndex) => (
                      image && typeof image === 'object' && image instanceof Blob && (
                        <img
                          key={imgIndex}
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${imgIndex + 1}`}
                          className="w-full h-24 object-cover"
                        />
                      )
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

        </div>
      </div>
   </div>
  );
};

export default MyHostels;
