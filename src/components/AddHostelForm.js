import React, { useState } from 'react';
import { useDataStore } from './datastore.js'; // Adjust the path as needed
import Modal from './modal.js'; // Import the modal component

const AddHostelForm = () => {
  // State variables to store form data
  const [name, setName] = useState('');
  const [roomType, setRoomType] = useState('');
  const [amountofrooms, setAmountOfRooms] = useState('');
  const [amount, setAmount] = useState('');
  const [distance, setDistance] = useState('');
  const [images, setImages] = useState([]);

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hostelDetails, setHostelDetails] = useState({});

  // Importing the arrays and their setters from the data store
  const {
    hostelNames, setHostelNames,
    roomTypes, setRoomTypes,
    amountsOfRooms, setAmountsOfRooms,
    amounts, setAmounts,
    distances, setDistances,
    imagesList, setImagesList,
  } = useDataStore();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newHostelDetails = {
      name,
      roomType,
      amountofrooms,
      amount,
      distance,
      images,
    };

    // Store the new values in the arrays
    setHostelNames([...hostelNames, name]);
    setRoomTypes([...roomTypes, roomType]);
    setAmountsOfRooms([...amountsOfRooms, amountofrooms]);
    setAmounts([...amounts, amount]);
    setDistances([...distances, distance]);
    setImagesList([...imagesList, images]);

    // Save the details for the modal and open the modal
    setHostelDetails(newHostelDetails);
    setIsModalOpen(true);

    // Clear form fields after submission
    setName('');
    setRoomType('');
    setAmountOfRooms('');
    setAmount('');
    setDistance('');
    setImages([]);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
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

        {/* Displaying the saved data */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Saved Hostel Descriptions</h3>
          <div className="space-y-4">
            {hostelNames.map((hostelName, index) => (
              <div key={index} className="p-4 border rounded-md bg-gray-100">
              <p><strong>Hostel Name:</strong> {hostelName}</p>
              <p><strong>Room Type:</strong> {roomTypes[index]}</p>
              <p><strong>Amount of Rooms:</strong> {amountsOfRooms[index]}</p>
              <p><strong>Amount (MWK):</strong> {amounts[index]}</p>
              <p><strong>Directions to Campus:</strong> {distances[index]}</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {imagesList[index] && imagesList[index].map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${imgIndex + 1}`}
                    className="w-full h-24 object-cover"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
};

export default AddHostelForm;
