import React, { useState, useEffect, useContext } from 'react';
import Hostel from './Hostel';
import SortDropdown from './SortDropdown';
import FilterDropdown from './FilterDropdown';
import { useUser } from './user'; // Import useUser hook
import { useHostels } from './HostelContext'; // Import HostelContext
import Navbar from './NavBar';

const Hostels = () => {
  const [sortCriteria, setSortCriteria] = useState('name');
  const [filterCriteria, setFilterCriteria] = useState('');
  const [selectedHostel, setSelectedHostel] = useState(null); // State to track selected hostel
  const { currentUser } = useUser(); // Get current user
  const isAdmin = currentUser?.accountType === 'Admin'; // Check if user is admin
  const { hostels: contextHostels } = useHostels(); // Access hostels from context
  const [filteredHostels, setFilteredHostels] = useState([]);

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  const handleFilterChange = (criteria) => {
    setFilterCriteria(criteria);
  };

  useEffect(() => {
    // Sort hostels based on selected criteria
    const sortedHostels = [...contextHostels].sort((a, b) => {
      if (sortCriteria === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortCriteria === 'date') {
        return new Date(b.dateUploaded) - new Date(a.dateUploaded);
      } else if (sortCriteria === 'distance') {
        return a.distance - b.distance;
      }
      return 0;
    });

    // Filter hostels based on selected criteria
    let updatedHostels = [...sortedHostels];
    if (filterCriteria === 'cheapest') {
      updatedHostels.sort((a, b) => a.rent - b.rent);
    } else if (filterCriteria === 'boys' || filterCriteria === 'girls') {
      updatedHostels = sortedHostels.filter((hostel) => hostel.gender === filterCriteria);
    }

    setFilteredHostels(updatedHostels);
  }, [contextHostels, sortCriteria, filterCriteria]);

  // Function to handle click on hostel image to display detailed view
  const handleClickHostel = (hostel) => {
    setSelectedHostel(hostel);
  };

  // Function to close detailed view
  const handleCloseDetail = () => {
    setSelectedHostel(null);
  };

  return (
    <div>
      <Navbar/>
    <div className="container mx-auto py-8">
      <div className="flex justify-between mb-4">
        <SortDropdown onSortChange={handleSortChange} />
        <FilterDropdown onFilterChange={handleFilterChange} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredHostels.map((hostel, index) => (
          <Hostel
            key={index}
            hostel={hostel}
            onClick={() => handleClickHostel(hostel)}
            showBookingButton={!isAdmin} // Pass showBookingButton prop for non-admin users
          />
        ))}
      </div>

      {/* Detailed view */}
      {selectedHostel && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            <button className="absolute top-0 right-0 p-2 text-gray-600" onClick={handleCloseDetail}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4">{selectedHostel.name}</h2>
            <img src={selectedHostel.image} alt={selectedHostel.name} className="w-full h-64 object-cover mb-4" />
            <p>Rent: {selectedHostel.rent}</p>
            <p>Distance: {selectedHostel.distance} km</p>
            <p>Rooms Available: {selectedHostel.roomsAvailable}</p>
            <p>Gender: {selectedHostel.gender}</p>
            <p>Landlord: {selectedHostel.landlord}</p>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Hostels;
