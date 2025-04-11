import React, { useState, useEffect } from 'react';
import Hostel from './Hostel';
import SortDropdown from './SortDropdown';
import FilterDropdown from './FilterDropdown';
import { useUser } from './user';
import { useHostels } from './HostelContext';
import Navbar from './NavBar';

const Hostels = () => {
  const [sortCriteria, setSortCriteria] = useState('name');
  const [filterCriteria, setFilterCriteria] = useState('');
  const [selectedHostel, setSelectedHostel] = useState(null);
  const { currentUser } = useUser();
  const isAdmin = currentUser?.accountType === 'Admin';
  const { hostels: contextHostels } = useHostels();
  const [filteredHostels, setFilteredHostels] = useState([]);

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  const handleFilterChange = (criteria) => {
    setFilterCriteria(criteria);
  };

  useEffect(() => {
    let sortedHostels = [...contextHostels];

    if (sortCriteria === 'name') {
      sortedHostels.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortCriteria === 'date') {
      sortedHostels.sort((a, b) => new Date(b.dateUploaded) - new Date(a.dateUploaded));
    } else if (sortCriteria === 'distance') {
      sortedHostels.sort((a, b) => a.distance - b.distance);
    }

    if (filterCriteria === 'cheapest') {
      sortedHostels.sort((a, b) => a.rent - b.rent);
    } else if (filterCriteria === 'boys' || filterCriteria === 'girls') {
      sortedHostels = sortedHostels.filter((hostel) => hostel.gender === filterCriteria);
    }

    setFilteredHostels(sortedHostels);
  }, [contextHostels, sortCriteria, filterCriteria]);

  const handleClickHostel = (hostel) => {
    setSelectedHostel(hostel);
  };

  const handleCloseDetail = () => {
    setSelectedHostel(null);
  };

  return (
    <div>
      <Navbar />
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
              showBookingButton={!isAdmin}
            />
          ))}
        </div>

        {selectedHostel && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-md">
              <button
                className="absolute top-2 right-2 p-2 text-gray-600 hover:text-gray-900"
                onClick={handleCloseDetail}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-xl font-bold mb-4">{selectedHostel.name}</h2>
              <img
                src={selectedHostel.image}
                alt={selectedHostel.name}
                className="w-full h-64 object-cover mb-4 rounded"
              />
              <p><strong>Rent:</strong> {selectedHostel.rent}</p>
              <p><strong>Distance:</strong> {selectedHostel.distance} km</p>
              <p><strong>Rooms Available:</strong> {selectedHostel.roomsAvailable}</p>
              <p><strong>Gender:</strong> {selectedHostel.gender}</p>
              <p><strong>Landlord:</strong> {selectedHostel.landlord}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hostels;
