import React, { useState, useEffect } from 'react';
import { useUser } from './user'; // Import useUser hook

const MyBookings = () => {
  const { currentUser } = useUser();
  const [bookings, setBookings] = useState([]);
  const currentDate = new Date();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (currentUser && currentUser.id) {
          // Fetch bookings from local storage for the current user
          const storedBookings = JSON.parse(localStorage.getItem(`bookings_${currentUser.id}`)) || [];
          setBookings(storedBookings);
        }
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };

    fetchBookings();
  }, [currentUser]);

  const isPastDate = (date) => new Date(date) < currentDate;

  const currentBookings = bookings.filter((booking) => !isPastDate(booking.bookingTime));
  const previousBookings = bookings.filter((booking) => isPastDate(booking.bookingTime));

  return (
    <div className="bg-gray-200 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-8">My Booking History</h2>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Current Bookings</h3>
          <ul className="space-y-4">
            {currentBookings.length > 0 ? (
              currentBookings.map((booking) => (
                <li key={booking.bookingTime} className="border rounded-lg shadow-sm bg-white">
                  <div className="p-4">
                    <p className="text-gray-700 font-semibold mb-2">Date: {new Date(booking.bookingTime).toLocaleDateString()}</p>
                    <p className="text-gray-700 font-semibold mb-2">Time: {new Date(booking.bookingTime).toLocaleTimeString()}</p>
                    <p className="text-gray-700 font-semibold mb-2">Hostel: {booking.hostelName}</p>
                    <p className="text-gray-700 font-semibold">Room: {booking.RoomNumber}</p>
                  </div>
                </li>
              ))
            ) : (
              <li className="border rounded-lg shadow-sm bg-white">
                <div className="p-4">
                  <p className="text-gray-700">No current bookings.</p>
                </div>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Previous Bookings</h3>
          <ul className="space-y-4">
            {previousBookings.length > 0 ? (
              previousBookings.map((booking) => (
                <li key={booking.bookingTime} className="border rounded-lg shadow-sm bg-white">
                  <div className="p-4">
                    <p className="text-gray-700 font-semibold mb-2">Date: {new Date(booking.bookingTime).toLocaleDateString()}</p>
                    <p className="text-gray-700 font-semibold mb-2">Time: {new Date(booking.bookingTime).toLocaleTimeString()}</p>
                    <p className="text-gray-700 font-semibold mb-2">Hostel: {booking.hostelName}</p>
                    <p className="text-gray-700 font-semibold">Room: {booking.RoomNumber}</p>
                  </div>
                </li>
              ))
            ) : (
              <li className="border rounded-lg shadow-sm bg-white">
                <div className="p-4">
                  <p className="text-gray-700">No previous bookings.</p>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;