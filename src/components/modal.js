// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, hostelDetails }) => {
  if (!isOpen) return null;

  const { name, roomType, amountofrooms, amount, distance, images } = hostelDetails;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Hostel Added Successfully!</h2>
        <p><strong>Hostel Name:</strong> {name}</p>
        <p><strong>Room Type:</strong> {roomType}</p>
        <p><strong>Amount of Rooms:</strong> {amountofrooms}</p>
        <p><strong>Amount (MWK):</strong> {amount}</p>
        <p><strong>Directions to Campus:</strong> {distance}</p>
        {images.length > 0 && (
          <div className="mt-4">
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
        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
