import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNotifications } from './Alert'; // Import useNotifications hook
import { useUser } from './user'; // Import useUser hook

const BookingPage = () => {
  const location = useLocation();
  const { hostel } = location.state;
  const { currentUser } = useUser();
  const { addNotification } = useNotifications();

  const [formData, setFormData] = useState({
    name: '',
    RoomNumber: '',
    email: '',
    phone: '',
  });
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Load bookings from local storage for the current user when component mounts
    const storedBookings = JSON.parse(localStorage.getItem(`bookings_${currentUser.id}`)) || [];
    setBookings(storedBookings);
  }, [currentUser.id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Input validation
    if (!formData.name || !formData.RoomNumber || !formData.email || !formData.phone) {
      alert('Please fill in all fields.');
      return;
    }

    // Check if the user has already booked a room
    const hasBooked = bookings.some(booking => booking.userId === currentUser.id);
    if (hasBooked) {
      alert('You have already booked a room.');
      return;
    }

    // Add booking to the bookings array
    const newBooking = {
      ...formData,
      hostelName: hostel.name,
      userId: currentUser.id,
      bookingTime: new Date().toISOString(),
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);

    // Save bookings to local storage for the current user
    localStorage.setItem(`bookings_${currentUser.id}`, JSON.stringify(updatedBookings));

    // Generate notification
    addNotification({
      title: 'Booking Confirmed',
      message: `You have successfully booked a room in ${hostel.name}.`
    });

    // Reset form data
    setFormData({
      name: '',
      RoomNumber: '',
      email: '',
      phone: '',
    });
  };

  return (
    <div className="container mx-auto py-8">
      {/* Sliding images of the hostel */}
      <h1 className="text-2xl font-bold mb-4">Booking for {hostel.name}</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Your booking form inputs */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="RoomNumber">
            Room Number
          </label>
          <input
            type="number"
            name="RoomNumber"
            value={formData.RoomNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {/* Other form inputs */}
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Confirm Booking
        </button>
      </form>
    </div>
   
  );
};

export default BookingPage;
