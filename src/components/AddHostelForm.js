import React, { useState } from 'react';
import Modal from './modal.js';
import { useHostels } from './HostelContext';

const AddHostelForm = () => {
  const [name, setName] = useState('');
  const [roomType, setRoomType] = useState('');
  const [amountofrooms, setAmountOfRooms] = useState('');
  const [amount, setAmount] = useState('');
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
      roomType,
      amountofrooms,
      amount,
      distance,
      images,
    };

    addHostel(newHostelDetails);
    setHostelDetails(newHostelDetails);
    setIsModalOpen(true);

    setName('');
    setRoomType('');
    setAmountOfRooms('');
    setAmount('');
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
    <div className="min-h-screen bg-gradient-to-b from-gray-400 to-gray-800 overflow-y-auto py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add Hostel Description</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">Hostel Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="roomType" className="block mb-1 font-medium">Room Type</label>
            <select
              id="roomType"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <label htmlFor="amountofrooms" className="block mb-1 font-medium">Amount of Rooms Available</label>
            <input
              type="number"
              id="amountofrooms"
              value={amountofrooms}
              onChange={(e) => setAmountOfRooms(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="block mb-1 font-medium">Amount (MWK)</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="distance" className="block mb-1 font-medium">Directions to Campus</label>
            <input
              type="text"
              id="distance"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="images" className="block mb-1 font-medium">Hostel Images</label>
            <input
              type="file"
              id="images"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              multiple
            />
          </div>
          {images.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-2">Image Preview</h3>
              <div className="grid grid-cols-3 gap-2">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-md"
                  />
                ))}
              </div>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
          >
            {loading ? 'Adding Hostel...' : 'Add Hostel'}
          </button>
        </form>

        {/* Modal for the congratulatory message */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          hostelDetails={hostelDetails}
        />
      </div>
    </div>
  );
};

export default AddHostelForm;
