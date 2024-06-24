import React, { useState } from 'react';
import Modal from './modal.js';
import { useHostels } from './HostelContext.js';
import LandlordNavbar from './LandloadNavbar';
const AddHostel = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [roomType, setRoomType] = useState('');
  const [roomsAvailable, setRoomsAvailable] = useState('');
  const [rent, setRent] = useState('');
  const [distance, setDistance] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hostelDetails, setHostelDetails] = useState({});

  const { addHostel } = useHostels();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const newHostelDetails = {
      name,
      gender,
      roomType,
      roomsAvailable,
      rent,
      distance,
      images,
    };

    addHostel(newHostelDetails);
    setHostelDetails(newHostelDetails);
    setIsModalOpen(true);

    setName('');
    setGender('');
    setRoomType('');
    setRoomsAvailable('');
    setRent('');
    setDistance('');
    setImages([]);
    setLoading(false);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const images = files.filter((file) => file.type.startsWith('image/'));
    setImages(images);
  };

  return (
    <div>
<LandlordNavbar />
      
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Add Hostel Description</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-1">Hostel Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="Gender" className="block text-gray-700 text-sm font-bold mb-1">Gender</label>
            <select
              type="text"
              id="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
               <option value="">Select gender</option>
              <option value="boys">Boys</option>
              <option value="girls">Girls</option>
            </select>
          </div>
          <div>
            <label htmlFor="roomType" className="block text-gray-700 text-sm font-bold mb-1">Room Type</label>
            <select
              type="text"
              id="roomType"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select Room Type</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Dormitory">Dormitory</option>
              <option value="Single and Double">Single and Double</option>
              <option value="Double and Dormitory">Double and Dormitory</option>
              <option value="Single and Dormitory">Single and Dormitory</option>
              <option value="All of the above">All of the above</option>
            </select>
          </div>
          <div>
            <label htmlFor="amountofrooms" className="block text-gray-700 text-sm font-bold mb-1"> Rooms available</label>
            <input
              type="number"
              id="amountofrooms"
              value={roomsAvailable}
              onChange={(e) => setRoomsAvailable(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-1">Rent (MWK)</label>
            <input
              type="number"
              id="amount"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="distance" className="block text-gray-700 text-sm font-bold mb-1">Distance from campus</label>
            <input
              type="text"
              id="distance"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="images" className="block text-gray-700 text-sm font-bold mb-1">Hostel Images</label>
            <input
              type="file"
              id="images"
              onChange={handleImageChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              multiple
            />
          </div>
          <div className="mt-4">
            {images.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">Image Preview</h3>
                <div className="grid grid-cols-3 gap-2">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">Add Hostel</button>
        </form>

        {/* Modal for the congratulatory message */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          hostelDetails={hostelDetails}
        />

      </div>
    </div>
    </div>
  );
};

export default AddHostel;
