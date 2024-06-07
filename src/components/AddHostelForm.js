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
    <div className="min-h-screen bg-gradient-to-b from-gray-400 to-gray-800 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Add Hostel Description</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">Hostel Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="roomType" className="block mb-1">Room Type</label>
            <select
              type="text"
              id="roomType"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
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
            <label htmlFor="amountofrooms" className="block mb-1">Amount of Rooms available</label>
            <input
              type="number"
              id="amountofrooms"
              value={amountofrooms}
              onChange={(e) => setAmountOfRooms(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="block mb-1">Amount (MWK)</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="distance" className="block mb-1">Directions to Campus</label>
            <input
              type="text"
              id="distance"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="images" className="block mb-1">Hostel Images</label>
            <input
              type="file"
              id="images"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
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
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Add Hostel</button>
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
