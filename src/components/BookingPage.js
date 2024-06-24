import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNotifications } from './Alert';
import { useUser } from './user';
import Navbar from './NavBar';

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
    if (currentUser && currentUser.id) {
      const storedBookings = JSON.parse(localStorage.getItem(`bookings_${currentUser.id}`)) || [];
      setBookings(storedBookings);
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.RoomNumber || !formData.email || !formData.phone) {
      alert('Please fill in all fields.');
      return;
    }

    const hasBooked = bookings.some(booking => booking.userId === currentUser.id);
    if (hasBooked) {
      const lastBooking = bookings.find(booking => booking.userId === currentUser.id);
      const lastBookingDate = new Date(lastBooking.bookingTime);
      const fourMonthsAgo = new Date();
      fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);

      if (lastBookingDate > fourMonthsAgo) {
        alert('You have already booked a room within the last four months. You can book again after four months.');
        return;
      }
    }

    const newBooking = {
      ...formData,
      hostelName: hostel.name,
      userId: currentUser.id,
      bookingTime: new Date().toISOString(),
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem(`bookings_${currentUser.id}`, JSON.stringify(updatedBookings));
    addNotification('Booking Confirmed', `You have successfully booked a room in ${hostel.name}.`);

    setFormData({
      name: '',
      RoomNumber: '',
      email: '',
      phone: '',
    });

    
  };

  return (
    <div>
      <Navbar/>
   
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Booking for {hostel.name}</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Confirm Booking
        </button>
      </form>
    </div>
    </div>
  );
};

export default BookingPage;
