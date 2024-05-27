import React, { useState } from 'react';
import Hostel from './Hostel';
import SortDropdown from './SortDropdown';
import FilterDropdown from './FilterDropdown';
import { useUser } from './user'; // Import useUser hook
//import Navbar from  "/.NavBar";
const Hostels = () => {
  const [sortCriteria, setSortCriteria] = useState('name');
  const [filterCriteria, setFilterCriteria] = useState('');
  const [selectedHostel, setSelectedHostel] = useState(null); // State to track selected hostel
  const { currentUser } = useUser(); // Get current user
  const isAdmin = currentUser?.accountType === 'Admin'; // Check if user is admin

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  const handleFilterChange = (criteria) => {
    setFilterCriteria(criteria);
  };

  const hostels = [
    {
      name: 'Matiya',
      rent: 60000,
      dateUploaded: '2024-05-15',
      distance: 2,
      roomsAvailable: 13,
      gender: 'male',
      image: '/images/room.webp',
      landlord: 'Mr. John Musa, 0994567890'
    },
    {
      name: 'Boss man',
      rent: 15000,
      dateUploaded: '2024-07-1',
      distance: 3,
      roomsAvailable: 2,
      gender: 'male',
      image: '/images/images (1).jpeg',
      landlord: 'Mr. Peter Smith, +0987654321'
    },
    {
      name: 'Ngwiya hostels',
      rent: 20000,
      dateUploaded: '2024-01-21',
      distance: 3,
      roomsAvailable: 20,
      gender: 'female',
      image: '/images/Hostel Life.jpeg',
      landlord: 'Mrs. Jane Doe, +1122334455'
    },
    {
      name: 'bente ',
      rent: 15000,
      dateUploaded: '2024-05-27',
      distance: 3,
      roomsAvailable: 89,
      gender: 'female',
      image: '/images/vi.jpeg',
      landlord: 'Miss. Ainani  , +9988776655'
    },
    {
      name: 'smiles garden',
      rent: 70000,
      dateUploaded: '2024-07-17',
      distance: 3,
      roomsAvailable: 20,
      gender: 'female',
      image: '/images/boys.jpeg',
      landlord: 'Ms. Alice Mwale, +5566778899'
    },
    {
      name: 'beit hostels',
      rent: 20000,
      dateUploaded: '2024-01-17',
      distance: 3,
      roomsAvailable: 20,
      gender: 'male',
      image: '/images/image-N.jpg',
      landlord: 'Mr. Charlie Chitimbe, 0863445566'
    },
    {
      name: 'Dyeratu hostels',
      rent: 15000,
      dateUploaded: '2024-05-17',
      distance: 3,
      roomsAvailable: 0,
      gender: 'female',
      image: '/images/image-g.jpeg',
      landlord: 'Ms. Linda Black, 0997889900'
    },
    {
      name: 'Chirwa hostels',
      rent: 40000,
      dateUploaded: '2024-05-17',
      distance: 3,
      roomsAvailable: 14,
      gender: 'male',
      image: '/images/hostel2.jpeg',
      landlord: 'Mr. David White, 0994556677'
    },
    {
      name: 'blue complex',
      rent: 60000,
      dateUploaded: '2024-04-29',
      distance: 2,
      roomsAvailable: 13,
      gender: 'female',
      image: '/images/Hostel for Girls.jpg',
      landlord: 'Mrs. Emma Mbelwe, 0994556677'
    },
    {
      name: 'Moyo hostels',
      rent: 45000,
      dateUploaded: '2024-04-29',
      distance: 2,
      roomsAvailable: 13,
      gender: 'female',
      image: '/images/hostel4.jpg',
      landlord: 'Mr. Henry Chimwala, 0866778899'
    }
  ];

  // Sort hostels based on selected criteria
  hostels.sort((a, b) => {
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
  let filteredHostels = [...hostels];
  if (filterCriteria === 'cheapest') {
    filteredHostels.sort((a, b) => a.rent - b.rent);
  } else if (filterCriteria === 'male' || filterCriteria === 'female') {
    filteredHostels = hostels.filter((hostel) => hostel.gender === filterCriteria);
  }

  // Function to handle click on hostel image to display detailed view
  const handleClickHostel = (hostel) => {
    setSelectedHostel(hostel);
  };

  // Function to close detailed view
  const handleCloseDetail = () => {
    setSelectedHostel(null);
  };

  return (
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
            showBookingButton={!isAdmin} // Pass showBookingButton prop
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
            {/* Add more details here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Hostels;